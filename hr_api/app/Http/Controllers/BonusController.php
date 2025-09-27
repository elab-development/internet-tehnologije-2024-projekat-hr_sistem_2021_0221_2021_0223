<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceBonus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BonusController extends ResponseHandlerController
{
    public function index()
    {
        $bonuses = \App\Models\Bonus::all();
        return $this->success(ResourceBonus::collection($bonuses), "Bonuses retrieved successfully");
    }

    public function bonusesByUser($userId)
    {
        $bonuses = \App\Models\Bonus::where('user_id', $userId)->get();
        return $this->success(ResourceBonus::collection($bonuses), "Bonuses for user ID {$userId} retrieved successfully");
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'amount' => 'required|numeric|min:0',
            'date_awarded' => 'required|date',
            'note' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $bonus = \App\Models\Bonus::create($request->all());
        return $this->success(new ResourceBonus($bonus), "Bonus created successfully", 201);
    }

    public function update($id, Request $request)
    {

        $validator = Validator::make($request->all(), [
            'amount' => 'sometimes|numeric|min:0',
            'note' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $bonus = \App\Models\Bonus::find($id);
        if (!$bonus) {
            return $this->error("Bonus not found", null, 404);
        }

        $bonus->update(
            $request->only(['amount', 'note'])
        );
        return $this->success(new ResourceBonus($bonus), "Bonus updated successfully");
    }

    public function destroy($id)
    {
        $bonus = \App\Models\Bonus::find($id);
        if (!$bonus) {
            return $this->error("Bonus not found", null, 404);
        }

        $bonus->delete();
        return $this->success(null, "Bonus deleted successfully");

    }
}
