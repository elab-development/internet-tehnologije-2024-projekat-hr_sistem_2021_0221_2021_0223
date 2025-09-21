<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BonusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();

        foreach ($users as $user) {
            $bonusCount = rand(0, 2);
            for ($i = 0; $i < $bonusCount; $i++) {
                \App\Models\Bonus::create([
                    'user_id' => $user->id,
                    'amount' => rand(100, 1000),
                    'date_awarded' => now()->subDays(rand(1, 365)),
                    'note' => 'Performance bonus for user ' . $user->name,
                ]);
            }
        }
    }
}
