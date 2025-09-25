<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PositionController extends ResponseHandlerController
{
    public function index()
    {
        $positions = \App\Models\Position::all();
        return $this->success(\App\Http\Resources\ResourcePosition::collection($positions), "Positions retrieved successfully");
    }
}
