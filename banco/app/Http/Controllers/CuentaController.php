<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use Illuminate\Http\Request;


class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $cuentas = Cuenta::all();

        return response()-> json(   $cuentas, 200); //envio todos los clientes en formato json
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

        $cuenta = new Cuenta($request->all());

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
            return response()->json('No se encuentra la cuenta', 404);

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

        if($cuenta)


            $cuenta->update($request->all());
        else
            return response()->json('No se encuentra la cuenta', 404);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        $cuenta = $this->buscaCuenta($id);

        $cuenta->delete();

        return response()->json('La cuenta con ha sido eliminada');
    }


}
