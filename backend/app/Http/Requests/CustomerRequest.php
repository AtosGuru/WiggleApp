<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;


/**
 * @property mixed $search
 * @property mixed $operator
 * @property mixed $profile
 */
class CustomerRequest extends FormRequest
{
    use SearchRequest;

    public const DEFAULT_LOGIC = "or";

    public const DEFAULT_SEARCH_FIELDS = 'profile->lastName,profile->firstName';

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            ...$this->searchRules()
        ];
    }
}
