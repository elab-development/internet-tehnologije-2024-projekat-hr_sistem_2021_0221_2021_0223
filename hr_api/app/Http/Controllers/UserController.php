<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourceUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends ResponseHandlerController
{
    //login

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = auth()->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return $this->success(
                [
                    'token' => $token,
                    'user' => new ResourceUser($user)
                ],
                "Login successful");
        } else {
            return $this->error("Invalid credentials", null, 401);
        }
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'telephone' => 'nullable|string',
            'address' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $user = \App\Models\User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'telephone' => $request->telephone,
            'address' => $request->address,
            'date_of_birth' => $request->date_of_birth,
        ]);

        return $this->success(new ResourceUser($user), "User registered successfully", 201);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return $this->success([], "Logged out successfully");
    }
}
