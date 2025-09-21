<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions  = [
            [
                'position_name' => 'Manager',
                'short_name' => 'MGR'
            ],
            [
                'position_name' => 'Developer',
                'short_name' => 'DEV'
            ],
            [
                'position_name' => 'Designer',
                'short_name' => 'DSG'
            ],
            [
                'position_name' => 'Analyst',
                'short_name' => 'ANL'
            ],
            [
                'position_name' => 'Tester',
                'short_name' => 'TST'
            ],
            [
                'position_name' => 'Support',
                'short_name' => 'SUP'
            ],
            [
                'position_name' => 'HR Specialist',
                'short_name' => 'HR'
            ],
            [
                'position_name' => 'Sales Executive',
                'short_name' => 'SLS'
            ],
            [
                'position_name' => 'Marketing Coordinator',
                'short_name' => 'MKT'
            ],
            [
                'position_name' => 'Intern',
                'short_name' => 'INT'
            ],
        ];

        foreach ($positions as $position) {
            \App\Models\Position::create($position);
        }
    }
}
