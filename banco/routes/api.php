<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\setUserFromToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CuentaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
        Route::middleware(SetUserFromToken::class)->group(function() {


            Route::get('cuentas', [CuentaController::class, 'index']);
            Route::get('cuentas/{id}', [CuentaController::class, 'show']);
            Route::post('cuentas', [CuentaController::class, 'store']);
            Route::delete('cuentas/{id}', [CuentaController::class, 'destroy']);
            Route::patch('cuentas/{id}', [CuentaController::class, 'update']);

            Route::get('clientes', [ClienteController::class, 'index']);
            Route::get('clientes/{id}', [ClienteController::class, 'show']);
            Route::get('clientes-cuentas/{id}', [ClienteController::class, 'cuentas']);
            Route::post('clientes', [ClienteController::class, 'store']);
            Route::delete('clientes/{id}', [ClienteController::class, 'destroy']);
            Route::patch('clientes/{id}', [ClienteController::class, 'update']);

            Route::get('users', [UserController::class, 'index']);
            Route::get('users/{id}', [UserController::class, 'show']);
            Route::post('users', [UserController::class, 'store']);
            Route::post('reset-password', [UserController::class, 'resetPassword']);
            Route::delete('users/{id}', [UserController::class, 'destroy']);
            Route::post('reset-password', [UserController::class, 'resetPassword']);


        });


        Route::post('login', [AuthController::class, 'login']);



