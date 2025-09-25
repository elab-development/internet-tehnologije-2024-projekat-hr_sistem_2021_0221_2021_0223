<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceSector;
use App\Models\Sector;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SectorController extends ResponseHandlerController
{
    public function index(Request $request)
    {
        $sectors = Sector::all();
        return $this->success(ResourceSector::collection($sectors), "Sectors retrieved successfully");
    }

    public function activeContractsPerSector()
    {
        $data = DB::table('contracts')
            ->join('sectors', 'contracts.sector_id', '=', 'sectors.id')
            ->select( 'sectors.sector_name', DB::raw('COUNT(contracts.id) as active_contracts_count'))
            ->whereNull('contracts.end_date')
            ->orWhere('contracts.end_date', '>', now())
            ->groupBy( 'sectors.sector_name')
            ->get();

        return $this->success($data, "Active contracts per sector retrieved successfully");
    }
}
