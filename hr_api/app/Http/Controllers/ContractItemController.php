<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContractItemController extends ResponseHandlerController
{
    public function index()
    {
        $contractItems = \App\Models\ContractItem::all();
        return $this->success(\App\Http\Resources\ResourceContrctItem::collection($contractItems), "Contract items retrieved successfully");
    }

    public function contractItemsByContract($contractId)
    {
        $contractItems = \App\Models\ContractItem::where('contract_id', $contractId)->with('position')->get();
        return $this->success(\App\Http\Resources\ResourceContrctItem::collection($contractItems), "Contract items for contract ID {$contractId} retrieved successfully");
    }

    public function store()
    {
        $validator = \Illuminate\Support\Facades\Validator::make(request()->all(), [
            'contract_id' => 'required|exists:contracts,id',
            'position_id' => 'required|exists:positions,id',
            'yearly_salary' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $contractItem = \App\Models\ContractItem::create(request()->all());
        return $this->success(new \App\Http\Resources\ResourceContrctItem($contractItem), "Contract item created successfully", 201);
    }

    public function destroy($id)
    {
        $contractItem = \App\Models\ContractItem::find($id);
        if (!$contractItem) {
            return $this->error("Contract item not found", null, 404);
        }

        $contractItem->delete();
        return $this->success(null, "Contract item deleted successfully");
    }

    public function paginate(Request $request)
    {
        $items = DB::table('contract_items')
            ->join('positions', 'contract_items.position_id', '=', 'positions.id')
            ->join('contracts', 'contract_items.contract_id', '=', 'contracts.id')
            ->join('users', 'contracts.user_id', '=', 'users.id')
            ->join('sectors', 'contracts.sector_id', '=', 'sectors.id')
            ->select(
                'contract_items.*',
                'positions.position_name as position_name',
                'users.name as user_name',
                'sectors.sector_name as sector_name',
                'contracts.type as contract_type'
            )
            ->paginate($request->get('per_page', 5));

        return $this->success($items, "Paginated contract items retrieved successfully");
    }
}
