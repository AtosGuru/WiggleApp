<?php

namespace App\Http\Services;

use App\Api;
use App\Exceptions\ApiDependencyException;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Utils;
use Psr\Http\Message\ResponseInterface;

/**
 * AbstractService is a class that implements the external Api interface.
 * It provides a facade to access the Services and a constructor to create a GuzzleHttp\Client.
 * It also provides a requestResult() method to make a request to the external API and a getResult() method to get the result of the request.
 * Finally, it provides a deleteNullFields() method to delete all null fields in a multilevel associative array.
 */
abstract class AbstractService implements Api
{
    /**
     * @var \GuzzleHttp\Client $client The GuzzleHttp\Client instance
     */
    protected Client $client;
    /**
     * @var \Psr\Http\Message\ResponseInterface $result The result of the request
     */
    private ResponseInterface $result;

    /**
     * __callStatic is a static method that allows to call a method on the class without instantiating it.
     *
     * @param string $method     The method to call
     * @param array  $parameters The parameters to pass to the method
     *
     * @return mixed The result of the method call
     */
    public static function __callStatic(string $method, array $parameters)
    {
        return (new static())->$method(...$parameters);
    }

    /**
     * facade is a static method that creates a new instance of the class.
     *
     * @return AbstractService The new instance of the class
     */
    public static function facade(): static
    {
        return new static();
    }

    /**
     * __construct is the constructor of the class.
     *
     * @param array $config The configuration for the GuzzleHttp\Client
     */
    public function __construct(array $config)
    {
        $this->client = new Client($config);
    }

    /**
     * requestResult is a protected method that makes a request to the API.
     *
     * @param string $method The request method
     * @param string $url    The URL of the API
     * @param array  $data   The data to pass to the API
     *
     * @return self The instance of the class
     *
     * @throws \App\Exceptions\ApiDependencyException
     */
    protected function requestResult(string $method, string $url, array $data = []): self
    {
        try {
            $this->result = $this->client->request($method, $url, $data);
        }
        catch (GuzzleException $e) {
            throw new ApiDependencyException(['message' => $e->getMessage()]);
        }
        return $this;
    }

    /**
     * getResult is a protected method that gets the result of the request.
     *
     * @param bool $del_null Whether to delete all null fields in the result
     *
     * @return mixed The result of the request
     */
    protected function getResult(bool $del_null = true): mixed
    {
        if ($del_null) {
            return $this->deleteNullFields(Utils::jsonDecode($this->result->getBody()->getContents(), true));
        }
        return Utils::jsonDecode($this->result->getBody()->getContents());
    }

    /**
     * deleteNullFields is a private method that deletes all null fields in a multilevel associative array.
     *
     * @param array $arr The array to be processed
     *
     * @return array The processed array
     */
    private function deleteNullFields(array $arr): array
    {
        foreach ($arr as $key => $value) {
            if (is_array($value) || is_object($value)) {
                $arr[$key] = $this->deleteNullFields((array)$value);
            } else if (is_null($value)) {
                unset($arr[$key]);
            }
        }
        return $arr;
    }

}