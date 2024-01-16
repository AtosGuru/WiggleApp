<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

/**
 * @property int $connection_id
 */
class MessageRequest extends FormRequest
{
    use SearchRequest;

    public const DEFAULT_LOGIC = "or";

    public const DEFAULT_SEARCH_FIELDS = 'message';

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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'connection_id' => [
                'integer', 'exists:connections,id',
                Rule::requiredIf('POST' === $this->method()),
            ],
            'message' => [ 'nullable', 'string', 'max:512' ],
            'image_id' => [ 'nullable', 'string', 'exists:images,id' ],
            ...$this->searchRules()
        ];
    }

}
