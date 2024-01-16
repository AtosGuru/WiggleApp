<?php

namespace App\Http\Requests;

use App\Connection as ConnectionAlias;
use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

class ConnectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        //in_array(auth()->user()->id, [$this->user_id, $this->partner_id])

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
            'type' => [
                'integer',
                Rule::in(ConnectionAlias::TYPES_ALL),
                Rule::requiredIf( empty($this->attributes()['id']) && 'POST' === $this->method() ),
            ],
            'partner_id' => [
                'integer', 'exists:users,id',
                Rule::requiredIf(in_array($this->type ?? null, ConnectionAlias::TYPES_WITH_PARTNER, true)),
            ],
            'event_id' => [
                'integer', 'exists:events,id',
            ],
        ];
    }

    public function doubleside()
    {
        return function ($query) {
            $query->where([
                ...$this->all(),
            ]);
            $query->where(function($query) {
                $query->where('user_id', $this->user()->id);
                $query->orWhere('partner_id', $this->user()->id);
            });
        };
    }

    public function valid($id = null)
    {
        return function ($query) use ($id) {
            $query->where('user_id', $this->user()->id);
            if (in_array($this->type ?? '', ConnectionAlias::TYPES_DOUBLESIDE, true)) {
                $query->orWhere('partner_id', $this->user()->id);
            }
            if (in_array($this->type ?? '', ConnectionAlias::TYPES_WITH_PARTNER, true)) {
                $query->orWhere('partner_id', $this->user()->id);
            }
            $query->where([
                ...$this->all(),
                ...($id ? ['id' => $id]: []),
            ]);
        };
    }


}
