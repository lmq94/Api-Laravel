<?php

namespace App\Http\Controllers;

use App\Models\Token;
use App\Models\User;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{

    protected string $apiToken;

    public function __construct()
    {
        $this->apiToken = uniqid(base64_encode(Str::random(60)));

    }

    private function deleteOldToken( User $user)
    {
        $token = Token::all()->where("user" ,$user->getAttribute("id"))->first();

        $token?->delete();
    }


    public function login(Request $request)
    {

        $user = User::all()->where('email', $request->get('email'))->first();



        if ($user) {

            if (Hash::check($request->get('password'), $user->getAttribute('password'))) {


                $this->deleteOldToken($user);
                $token = new Token();
                $token->setAttribute('valor', md5($this->apiToken));
                $token->setAttribute('user', $user->getAttribute('id'));
                $token->setAttribute('creation_date', DateTime::createFromFormat(DATE_ATOM, date(DATE_ATOM)));
                $token->save();

                return Response()->json($this->apiToken);

            } else {
                return Response()->json("Contraseña incorrecta ");
            }
        }
        else
            return Response()->json("Usuario invalido");

    }

    public function logout(Request $request){

        $this->deleteOldToken($request->get("user"));

        return response()->json("Usted se ha deslogeado");
    }




}





