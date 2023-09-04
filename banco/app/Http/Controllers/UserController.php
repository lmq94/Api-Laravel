<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Cuenta;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()-> json($users);
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

        $user = new User($request->all());

        if($user->getAttribute('rol') == "admin"){

            $mockCliente = new Cliente();



            $mockCliente->setAttribute("alias", "Test");
            $mockCliente->setAttribute("city", "Tandil");
            $mockCliente->setAttribute("dni", "123456");

            $mockCliente->save();

            $user->setAttribute("id_cliente",$mockCliente->getAttribute("id"));
        }


        $user->save();

        return response()->json($user);

    }

    /**
     * Display the specified resource.
     */
    public function show( int $id)
    {
        $user = $this->buscaCuenta($id);

        if($user)

            return  $user->jsonSerialize();

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


}
