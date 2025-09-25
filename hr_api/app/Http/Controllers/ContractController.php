<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContractController extends ResponseHandlerController
{
    public function index()
    {
        $contracts = \App\Models\Contract::all();
        return $this->success(\App\Http\Resources\ResourceContract::collection($contracts), "Contracts retrieved successfully");
    }

    public function contractsByUser($userId)
    {
        $contracts = \App\Models\Contract::where('user_id', $userId)->get();
        return $this->success(\App\Http\Resources\ResourceContract::collection($contracts), "Contracts for user ID {$userId} retrieved successfully");
    }

    public function store(Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'sector_id' => 'required|exists:sectors,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'type' => 'required|string|max:100',
        ]);
        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }
        $contract = \App\Models\Contract::create($request->all());
        return $this->success(new \App\Http\Resources\ResourceContract($contract), "Contract created successfully", 201);
    }

    public function destroy($id)
    {
        $contract = \App\Models\Contract::find($id);
        if (!$contract) {
            return $this->error("Contract not found", null, 404);
        }
        $contract->delete();
        return $this->success(null, "Contract deleted successfully");
    }
}
