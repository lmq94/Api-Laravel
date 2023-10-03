<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\setUserFromToken;
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


            Route::get('clientes/{id}', [ClienteController::class, 'show']);
            Route::get('clientes-cuentas', [ClienteController::class, 'cuentas']);
            Route::delete('clientes/{id}', [ClienteController::class, 'destroy']);
            Route::patch('clientes/{id}', [ClienteController::class, 'update']);

            Route::get('users', [UserController::class, 'index']);
            Route::get('user', [UserController::class, 'show']);
            Route::post('reset-password', [UserController::class, 'resetPassword']);
            Route::delete('users/{id}', [UserController::class, 'destroy']);
            Route::put('users/{id}', [UserController::class, 'update']);
            Route::post('logout', [AuthController::class, 'logout']);
            Route::get('show/{filename}', [UserController::class,'getImage']);


        });

        Route::get('clientes', [ClienteController::class, 'index']);
        Route::post('clientes', [ClienteController::class, 'store']);
        Route::post('users', [UserController::class, 'store']);
        Route::post('login', [AuthController::class, 'login']);



