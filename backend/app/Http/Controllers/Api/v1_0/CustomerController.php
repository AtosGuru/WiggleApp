<?php

namespace App\Http\Controllers\Api\v1_0;

use App\Api;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use App\Http\Resources\CustomerCollection;
use App\Models\User;
use App\Tools;
use GuzzleHttp\Utils;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

/**
 * Class CustomerController
 *
 * This class is responsible for handling all customer related requests.
 * It provides methods for getting a single user, getting all users, and updating a user's profile.
 */
class CustomerController extends Controller
{
    /**
     * Get a single user.
     *
     * @param Request $request The request object.
     *
     * @return Response The response object.
     */
    public function user(Request $request): Response
    {
        return response([
            'status' => Api::STATUS_SUCCESS,
            'user' => $request->user()->load('connections'),
        ]);
    }

    /**
     * Get a single user.
     *
     * @param \App\Http\Requests\CustomerRequest $request The request object.
     * @param int                                $id
     * @return Response The response object.
     */
    public function customer(CustomerRequest $request, int $id): Response
    {
        Log::info('Customer {user} get info about user {id}', ['id'=>$id, 'user'=>$request->user()->id]);
        return response([
            'status' => Api::STATUS_SUCCESS,
            'user' => User::query()->where($request->search('id', $id, 'equal'))->get(),
        ]);
    }

    /**
     * Get all users.
     *
     * @return Response The response object.
     */
    public function index(CustomerRequest $request): CustomerCollection
    {
        return new CustomerCollection(
            User::query()->where($request->search())->paginate(),
        );
    }

    /**
     * Update a username.
     *
     * @param Request $request The request object.
     *
     * @return Response The response object.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Request $request): Response
    {
        $user = $request->user();
        $valid = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:users'],
        ]);

        $user->name = $valid['name'];
        $user->save();

        return response([
            'status' => Api::STATUS_SUCCESS,
            'user' => $user,
            'valid' => $valid,
        ]);
    }

    /**
     * Update a user's profile.
     *
     * @param Request $request The request object.
     *
     * @return Response The response object.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function profile(Request $request): Response
    {
        $user = $request->user();
        $valid = $request->validate([
            'profile' => ['json', 'required'],
        ]);

        $valid = Utils::jsonDecode($valid['profile'], true, 512, JSON_THROW_ON_ERROR);
        if (is_array($valid) || is_object($valid)) {
            $user->profile = Tools::mergeJson($valid, (array)$user->profile, ["identifier" => $user->profile->identifier]);
            $user->save();
        }

        return response([
            'status' => Api::STATUS_SUCCESS,
            'profile' => $user->profile,
            'valid' => $valid,
        ]);
    }

    /**
     * Delete customer
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request): Response
    {
        $user = $request->user();
        $user->delete();

        return response([
            'status' => Api::STATUS_DELETED,
        ]);
    }
}