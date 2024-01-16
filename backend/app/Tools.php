<?php

namespace App;

class Tools
{
    /**
     * Merge JSON
     * @param array $fresh
     * @param array $old
     * @param array $source
     * @return array
     */
    public static function mergeJson(array $fresh, array $old, array $source = []): array
    {
        foreach ($fresh as $key => $value) {
            if (!is_array($value)) {
                continue;
            }
            if (self::isList($value)) {
                $source[$key] = $value;
                continue;
            }
            $source[$key] = $value + (array)($old[$key] ?? null);
        }
        $source += $fresh + $old;

        return $source;
    }

    /**
     * Non-associative array check
     * @param array $arr
     * @return bool
     */
    public static function isList(array $arr): bool
    {
        if ($arr === []) {
            return true;
        }
        return array_keys($arr) === range(0, count($arr) - 1);
    }
}