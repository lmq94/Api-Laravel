<?php

namespace App\Http\Controllers;

use App\Models\Cliente;


use Illuminate\Http\Request;


class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clientes = Cliente::all();

        return response()->json($clientes);
    }

    private function buscaClientes($id){
        $clientes = Cliente::all();

        return $clientes->find($id);
    }

    public function cuentas($id){

            $cliente = $this->buscaClientes($id);

            if($cliente) {

                $cuentas = $cliente->cuentas;

                return response()->json($cuentas);
            }
            else
                 return response()->json("No se encontro el cliente solicitado", 404);

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
        $cliente = new Cliente($request->all());

        $cliente->save();

        return response()->json($cliente);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $cliente = $this->buscaClientes($id);

        return response()->json($cliente);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $cliente = new Cliente($request->all());

        $cliente->update();

        return response()->json($cliente);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Cliente::destroy($id);

        return response()->json('El cliente ha sido eliminada');
    }


}
