<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/login', [\App\Http\Controllers\UserController::class, 'login']);

Route::get('/sectors', [\App\Http\Controllers\SectorController::class, 'index']);
Route::get('/sectors/active-contracts', [\App\Http\Controllers\SectorController::class, 'activeContractsPerSector']);
Route::get('/positions', [\App\Http\Controllers\PositionController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [\App\Http\Controllers\UserController::class, 'logout']);

    Route::resource('/bonuses', \App\Http\Controllers\BonusController::class)->only(['index', 'store', 'update', 'destroy'])->middleware(\App\Http\Middleware\AdminAccess::class);
    Route::get('/users/{userId}/bonuses', [\App\Http\Controllers\BonusController::class, 'bonusesByUser']);

    Route::resource('/reviews', \App\Http\Controllers\ReviewController::class)->only(['index', 'store', 'destroy'])->middleware(\App\Http\Middleware\AdminAccess::class);
    Route::get('/users/{userId}/reviews', [\App\Http\Controllers\ReviewController::class, 'reviewsByUser']);
    Route::get('/reviews/scores', [\App\Http\Controllers\ReviewController::class, 'scores']);

    Route::resource('/contracts', \App\Http\Controllers\ContractController::class)->only(['index', 'store', 'destroy'])->middleware(\App\Http\Middleware\AdminAccess::class);
    Route::get('/users/{userId}/contracts', [\App\Http\Controllers\ContractController::class, 'contractsByUser']);

    Route::resource('/contract-items', \App\Http\Controllers\ContractItemController::class)->only(['index', 'store', 'destroy'])->middleware(\App\Http\Middleware\AdminAccess::class);
    Route::get('/contracts/{contractId}/contract-items', [\App\Http\Controllers\ContractItemController::class, 'contractItemsByContract']);

    Route::post('/register', [\App\Http\Controllers\UserController::class, 'register'])->middleware(\App\Http\Middleware\AdminAccess::class);
    Route::get('/employees', [\App\Http\Controllers\UserController::class,'employees'])->middleware(\App\Http\Middleware\AdminAccess::class);
});
