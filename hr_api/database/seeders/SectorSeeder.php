<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SectorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sectorNames = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Customer Support', 'R&D', 'Operations', 'Legal', 'Administration'];

        foreach ($sectorNames as $name) {
            \App\Models\Sector::create(['sector_name' => $name]);
        }
    }
}
