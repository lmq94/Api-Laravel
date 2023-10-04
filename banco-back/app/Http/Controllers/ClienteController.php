<?php

namespace App\Http\Controllers;

use App\Models\Cliente;


use Illuminate\Http\Request;


class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
            $clientes = Cliente::all();

            return response()->json($clientes);

    }

    private function buscaClientes($id){
        $clientes = Cliente::all();

        return $clientes->find($id);
    }

    public function cuentas( Request $request){

            $user = $request->get("user");

            $cliente = $this->buscaClientes($user->getAttribute("id_cliente"));

            if($cliente) {

                $cuentas = $cliente->cuentas;

                return response()->json($cuentas);
            }
            else
                 return response()->json("No se encontro el cliente solicitado", 204);

    }

   
    public function create()
    {
        //
    }

  
    public function store(Request $request)
    {
        $cliente = new Cliente(['alias' => $request->get('alias'),
                                'city' => $request->get('city'),
                                'dni' => $request->get('dni'),
                                'domicilio' => $request->get('domicilio'),          
                                'numero_de_telefono' => $request->get('numero_de_telefono'), 
                            ]);

        $cliente->save();

        return response()->json($cliente);
    }

   
    public function show($id)
    {

        $cliente = $this->buscaClientes($id);

        if($cliente)

        return response()->json($cliente);

        else
            return response()->json("No se encuentra el cliente solicitado", 204);
    }

   
    public function edit(Cliente $cliente)
    {
        //
    }

 
    public function update(Request $request, $id)
    {
        $cliente = $this->buscaClientes($id);

        if($cliente) {

            $cliente->update(['alias' => $request->get('alias'),
                             'city' => $request->get('city'),
                            'dni' =>$request->get('city'),
                            'domicilio' => $request->get('domicilio'),          
                            'numero_de_telefono' => $request->get('numero_de_telefono'), 
                            ]);

            return response()->json($cliente);

        }
        else
            return response()->json("No se encuentra el cliente", 204);
    }

 
    public function destroy($id)
    {
        Cliente::destroy($id);

        return response()->json('El cliente ha sido eliminada');
    }


}
