<?php

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase
{
    public function test_addition()
    {
        $this->assertEquals(4, 2 + 2); // failing test case done on purpose, check ci-cd-demo.yml file
        // testing some changes
    }
}
