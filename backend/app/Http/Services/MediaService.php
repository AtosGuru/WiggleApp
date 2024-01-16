<?php

namespace App\Http\Services;

use App\Api;
use App\Exceptions\ApiDependencyException;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\MultipartStream;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\RedirectMiddleware;

class MediaService extends AbstractService
{
    private const URL_UPDATE = '/v2/direct_upload';

    public function __construct(array $config = [])
    {
        parent::__construct($config + [
            'allow_redirects' => RedirectMiddleware::$defaultSettings,
            'http_errors' => false,
            'decode_content' => true,
            'verify' => true,
            'headers' => [
                'Authorization' => 'Bearer ' . self::CLOUDFLARE_API_TOKEN,
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    public function getResult(bool $del_null = true): mixed
    {
        $result = parent::getResult($del_null);

        if (!$result->success) {
            throw new ApiDependencyException(['cloudflare' => $result], 'Failed CLOUDFLARE dependency');
        }

        return $result;
    }

    /**
     * Direct uploads allow users to upload images without API keys. A common use case are web apps,
     * client-side applications, or mobile devices where users upload content directly to Cloudflare
     * Images. This method creates a draft record for a future image. It returns an upload URL and
     * an image identifier. To verify if the image itself has been uploaded, send an image details
     * request (accounts/:account_identifier/images/v1/:identifier), and check that the draft: true
     * property is not present.
     *
     * @return mixed
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function storage(): mixed
    {
        return $this->requestResult('post', self::CLOUDFLARE_API_URL . self::URL_UPDATE )
                    ->getResult(false);
    }

    /**
     * Fetch details for a single image.
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function details($id) {
        return $this->requestResult('GET', self::CLOUDFLARE_API_URL . '/v1/' . $id)
                    ->getResult(false);
    }

    /**
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function delete($id) {

        return $this->requestResult('DELETE', self::CLOUDFLARE_API_URL . '/v1/' . $id, [])
                    ->getResult(false);
    }

    /**
     * @throws \App\Exceptions\ApiDependencyException
     */
    public function list()
    {
        return $this->requestResult('GET', self::CLOUDFLARE_API_URL . '/v1')
                    ->getResult(false);
    }

    public function upload($file) {
        $flare = self::facade()->storage();

        $client = new Client();
        $request = new Request('POST', $flare->result->uploadURL, [], new MultipartStream([
            [
                'name' => 'file',
                'contents' => fopen($file->getPathname(), 'r'),
                'filename' => $file->getClientOriginalName(),
            ],
        ]));

        $client->send($request);

        return $flare;
    }

}
