<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContractItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contracts = \App\Models\Contract::all();
        $positions = \App\Models\Position::all();

        foreach ($contracts as $contract) {
            \App\Models\ContractItem::create([
                'contract_id' => $contract->id,
                'position_id' => $positions->random()->id,
                'yearly_salary' => rand(20000, 70000),
                'start_date' => $contract->start_date,
                'end_date' => null,
            ]);
        }
    }
}
