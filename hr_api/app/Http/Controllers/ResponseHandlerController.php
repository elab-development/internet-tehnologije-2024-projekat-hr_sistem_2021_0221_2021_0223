<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResponseHandlerController extends Controller
{
    public function success($data, $message = "Request was successful", $code = 200)
    {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public function error($message = "An error occurred", $data = null, $code = 400)
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
