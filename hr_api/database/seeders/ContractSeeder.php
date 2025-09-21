<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        $contractTypes = ['Full-time', 'Part-time', 'Contractor', 'Internship', 'Temporary'];
        $sectors = \App\Models\Sector::all();

        foreach ($users as $user) {
            $startDate = now()->subDays(rand(30, 365));
            $endDate = null;

            \App\Models\Contract::create([
                'user_id' => $user->id,
                'sector_id' => $sectors->random()->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'type' => $contractTypes[array_rand($contractTypes)],
            ]);

        }


    }
}
