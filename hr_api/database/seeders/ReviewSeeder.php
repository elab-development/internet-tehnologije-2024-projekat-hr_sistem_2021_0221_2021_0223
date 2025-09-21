<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = \App\Models\User::all();
        $scores = [
            \App\Models\Review::BELLOW_AVERAGE,
            \App\Models\Review::AVERAGE,
            \App\Models\Review::GOOD,
            \App\Models\Review::EXCELLENT,
            \App\Models\Review::OUTSTANDING,
        ];

        foreach ($users as $user) {
            $reviewCount = rand(1, 3);
            for ($i = 0; $i < $reviewCount; $i++) {
                \App\Models\Review::create([
                    'user_id' => $user->id,
                    'review_date' => now()->subDays(rand(1, 365)),
                    'score' => $scores[array_rand($scores)],
                    'comments' => 'This is a sample review comment for user ' . $user->name,
                ]);
            }
        }
    }
}
