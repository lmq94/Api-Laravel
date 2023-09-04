<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    protected string $apiToken;

    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(60)));
        $cryptToken = md5(($this->apiToken));
        return $this->apiToken;
    }


    public function login(Request $request){

        $user = User::all()->where('email', $request->get('email'));

        if($user)

            if( Hash::check($request->get('password'),$user->first()->getAttribute('password') ) )
                return  Response()->json($this->apiToken);
            else
                return  Response()->json("Contraseña incorrecta ");
        else
            return  Response()->json("Usuario invalido");
    }




}





