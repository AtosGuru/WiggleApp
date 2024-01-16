<?php

use App\Tools;
use PHPUnit\Framework\TestCase;

class ToolsTest extends TestCase
{
    private $first = [
        [
            'age' => 31,
            'address' => [
                'city' => 'Los Angeles',
                'state' => 'CA',
            ],
            'hobbies' => ['reading', 'gaming'],
        ],
        [
            'address' => ['Los Alamos'],
            'hobbies' => ['driving']
        ]
    ];
    private $second = [
        'name' => 'John',
        'age' => 30,
        'address' => [
            'street' => '123 Main St',
            'city' => 'New York',
        ],
    ];
    private $expected = [
        [
            'name' => 'John',
            'age' => 31,
            'address' => [
                'street' => '123 Main St',
                'city' => 'Los Angeles',
                'state' => 'CA',
            ],
            'hobbies' => ['reading', 'gaming'],
        ],
        [
            'name' => 'John',
            'age' => 30,
            'address' => [
                'Los Alamos',
            ],
            'hobbies' => ['driving'],
        ],
    ];


    public function testMergeJson()
    {
        $result = Tools::mergeJson($this->first[0], $this->second);
        $this->assertEquals($this->expected[0], $result);
        $result = Tools::mergeJson($this->first[1], $this->second);
        $this->assertEquals($this->expected[1], $result);
    }

    public function testIsList()
    {
        $list = [1, 2, 3];
        $associative = ['name' => 'John', 'age' => 30];
        $empty = [];

        $this->assertTrue(Tools::isList($list));
        $this->assertFalse(Tools::isList($associative));
        $this->assertTrue(Tools::isList($empty));
    }
}