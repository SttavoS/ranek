<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/register', [AuthController::class, 'register']);

Route::group(['middleware' => ['apiJwt']], function () {
    Route::post('auth/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('auth/refresh', [AuthController::class, 'refresh'])->name('refresh.token');
    Route::get('auth/me', [AuthController::class, 'me'])->name('user.me');

    Route::get('user/{id}/products', [UserController::class, 'getUserProducts'])->name('user.products');

    Route::post('product', [ProductController::class, 'store'])->name('product.store');
    Route::put('product/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
});

Route::get('products', [ProductController::class, 'index']);
Route::get('product/{slug}', [ProductController::class, 'show']);

Route::post('user', [UserController::class, 'store'])->name('user.store');
