<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = \App\Models\User::create([
            'name' => 'Vanja Parezanovic',
            'email' => 'vanja@gmail.com',
            'password' => bcrypt('vanja123'),
            'role' => 'admin',
            'telephone' => '0641234567',
            'address' => 'Bulevar Oslobodjenja 1',
            'date_of_birth' => '2002-07-13',
        ]);

        $admin = \App\Models\User::create([
            'name' => 'Aleksa Petkovic',
            'email' => 'aleksa@gmail.com',
            'password' => bcrypt('aleksa123'),
            'role' => 'admin',
            'telephone' => '0641234567',
            'address' => 'Bulevar Oslobodjenja 1',
            'date_of_birth' => '2002-06-19',
        ]);

        $faker = \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            $user = \App\Models\User::create([
                'name' => $faker->name(),
                'email' => $faker->unique()->safeEmail(),
                'password' => bcrypt('password'),
                'role' => 'employee',
                'telephone' => $faker->phoneNumber(),
                'address' => $faker->address(),
                'date_of_birth' => $faker->date('Y-m-d', '2005-01-01'),
            ]);
        }
    }
}
