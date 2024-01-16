<?php

namespace App\Http\Requests;

use Illuminate\Database\Eloquent\Builder;

/**
 * @const DEFAULT_LOGIC            Must be defined in extendable class
 * @const DEFAULT_SEARCH_FIELDS    Must be defined in extendable class
 */
trait SearchRequest
{
    public const LIKE_OPERATOR = 'like';

    public const SEARCH_OPERATOR = [
        'like' => 'like',
        'more' => '>',
        'greater' => '>',
        'area' => '',
        'lower' => '<',
        'less' => '<',
        'equal' => '=',
        'not_equal' => '<>',
        'null' => 'null',
        'not_null' => 'not_null',
    ];

    public function searchRules(): array
    {
        return [
            'search' => ['string'],
            'field' => ['string'],
            'operator' => ['string', 'regex:/((greater|more|lower|less|equal|not_equal|like|area|json),?)+/'],
            'logic' => ['string', 'in:and,or'],
            'profile' => ['json'],
            'area' => ['decimal:0,7'],
            'latitude' => ['decimal:0,7','required_with:area'],
            'longitude' => ['decimal:0,7','required_with:area'],
        ];
    }

    public function search($field = self::DEFAULT_SEARCH_FIELDS, $search = '', $operator = self::LIKE_OPERATOR): \Closure
    {
        return function ($query) use ($search, $operator, $field) {
            $field = $this->getComponent($this->field ?? $field, 1);
            $operator = $this->getComponent($this->operator ?? $operator);
            $search = $this->getComponent($this->search ?? $search);

            foreach ($field as $cell) {
                $this->makeQuery($query, $cell, $operator->current(), $search->current());
                $search->next();
                $operator->next();
            }
        };
    }

    private function getComponent($source, $loop = 10): \Generator
    {
        $list = explode(',', $source);
        do {
            foreach ($list as $value) {
                yield $value;
            }
        } while (--$loop);
        return end($list);
    }

    private function makeQuery(Builder $query, $cell = self::DEFAULT_SEARCH_FIELDS, $operator = self::LIKE_OPERATOR, $search = ''): void
    {
        switch (true) {
            case 'area' === $operator && ($this->latitude ?? false) && ($this->longitude ?? false):
                $query->where(function ($query) use ($cell) {
                    $query->where($cell . "->latitude", ">", (float)$this->latitude - (float)$this->area);
                    $query->where($cell . "->latitude", "<", (float)$this->latitude + (float)$this->area);
                    $query->where($cell . "->longitude", ">", (float)$this->longitude - (float)$this->area);
                    $query->where($cell . "->longitude", "<", (float)$this->longitude + (float)$this->area);
                }, null ,null,$this->logic ?? self::DEFAULT_LOGIC);
                return;
            case 'json' === $operator && ($this->profile ?? false):
                $query->whereRaw('JSON_CONTAINS(' . $cell . ', ?)', $this->profile, $this->logic ?? self::DEFAULT_LOGIC);
                return;
            case 'null' === $operator && ($this->profile ?? false):
                $query->whereNull($cell, $this->logic ?? self::DEFAULT_LOGIC);
                return;
            case 'not_null' === $operator && ($this->profile ?? false):
                $query->whereNotNull($cell, $this->logic ?? self::DEFAULT_LOGIC);
                return;
            default:
                foreach (explode(' ', $search) as $s) {
                    $query->where($cell, $this->makeOperator($operator), $this->wrapLike($s, $operator), $this->logic ?? self::DEFAULT_LOGIC);
                }
        }
    }

    private function makeOperator($operator): string
    {
        return self::SEARCH_OPERATOR[$operator] ?? self::LIKE_OPERATOR;
    }

    private function wrapLike($search, $operator = self::LIKE_OPERATOR): string
    {
        return self::LIKE_OPERATOR === $operator
            ? '%' . $search . '%'
            : $search;
    }
}