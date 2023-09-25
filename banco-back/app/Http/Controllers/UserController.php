<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Cuenta;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if($this->isAdmin($request)) {
        $users = User::all();

        return response()-> json($users);
        }

        return response()->json("No cuentas con los permisos para esta peticion");
    }


    private function buscaCuenta($id){
        $users = User::all();

        return $users->find($id);
    }



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $user = new User([  "name" => $request->get("name"),
                            "email" => $request->get("email"),
                            "password" => $request->get("password"),
                            "rol" => $request->get("rol"),
                            "id_cliente" => $request->get("id_cliente")]);

        if($request->get('rol') == "admin"){

            $mockCliente = new Cliente(["alias" => "test", "city" => "Tandil", "dni" => "123456"]) ;

            $mockCliente->save();

            $user->setAttribute("id_cliente",$mockCliente->getAttribute("id"));
        }


        $user->save();

        return response()->json($user);

    }

    /**
     * Display the specified resource.
     */
    public function show( Request $request)
    {
        $user = $this->buscaCuenta($request->get("user")->getAttribute("id"));
        

        if($user)

            return  response()->json($user);

        else
            return response()->json('No se encuentra el usuario solicitado', 204);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cuenta $cuenta)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = $this->buscaCuenta($id);

        if($user) {

            $user->update($request->all());

            return response()->json($user);

        }
        else
            return response()->json('No se encuentra el usuario solicitado', 204);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        user::destroy($id);

        return response()->json('EL usuario ha sido eliminado');
    }

    public function resetPassword(Request $request){

       $user = User::all()->where('email', $request->get("email"))->first();

       $user->update(["password" => $request->get("password")]);


       return  response()->json("Se actualizo con exito la contraseña");
    }


}
