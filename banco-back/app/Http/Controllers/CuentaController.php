<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use Illuminate\Http\Request;



class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index( Request $request)
    {
        if($this->isAdmin($request)) {

            $cuentas = Cuenta::all();

            return response()->json($cuentas); //envio todos los clientes en formato json
        }
        else
            return response()->json("No cuentas con los permisos para esta peticion", 403);
    }

    private function buscaCuenta($id){
        $cuentas = Cuenta::all();

        return $cuentas->find($id);
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

        $cuenta = new Cuenta([  "saldo" => $request->get("saldo"),
                                "tipo_de_cuenta" => $request->get("tipo_de_cuenta"),
                                "moneda" => $request->get("moneda"),
                                "id_cliente" => $request->get("user")->getAttribute("id_cliente"),
                                "cbu"  => implode('', array_map(fn() => mt_rand(0, 9), range(1, 22))),
                                ]);
        $cuenta->save();

        return response()->json($cuenta, 200);

    }

    /**
     * Display the specified resource.
     */
    public function show( int $id)
    {
        $cuenta = $this->buscaCuenta($id);

        if($cuenta)

            return response()-> json($cuenta);

        else
            return response()->json('No se encuentra la cuenta', 204);

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
        $cuenta = $this->buscaCuenta($id);

        if($cuenta) {

            $cuenta->update($request->all());

            return response()->json($cuenta);

        }
        else
            return response()->json('No se encuentra la cuenta', 204);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        Cuenta::destroy($id);

        return response()->json('La cuenta con ha sido eliminada');
    }


}
