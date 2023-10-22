<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;


class ClienteController extends Controller
{
    protected $rules = [
        'alias' => 'required|string|max:255',
        'city' => 'required|string|max:255',
        'dni' => 'required|max:20',
        'domicilio' => 'required|string|max:255',
        'numero_de_telefono' => 'required|max:11',
    ];

    protected $messages = [
        'required' => 'El campo :attribute es obligatorio.',
        'alias.string' => 'El campo Alias debe ser una cadena de caracteres.',
        'alias.max' => 'El campo Alias no debe tener más de :max caracteres.',
        'city.string' => 'El campo Ciudad debe ser una cadena de caracteres.',
        'city.max' => 'El campo Ciudad no debe tener más de :max caracteres.',
        'dni.max' => 'El campo DNI no debe tener más de :max dígitos.',
        'domicilio.string' => 'El campo Domicilio debe ser una cadena de caracteres.',
        'domicilio.max' => 'El campo Domicilio no debe tener más de :max caracteres.',
        'numero_de_telefono.max' => 'El campo Número de Teléfono no debe tener más de :max dígitos.',
    ];


    public function index(Request $request){
        
            if($this->isAdmin($request)){

                $clientes = Cliente::all();

                return response()->json($clientes);
            }
            
            else 
                return response()->json("No tienes permisos para esta peticion", 401);

    }

   

    public function cuentas( Request $request){

            $user = $request->get("user");

            $cliente = Cliente::find($user->getAttribute("id_cliente"));

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

        $validator = Validator::make($request->all(), $this->rules, $this->messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
        else {
            $cliente = new Cliente(['alias' => $request->get('alias'),
                                    'city' => $request->get('city'),
                                    'dni' => $request->get('dni'),
                                    'domicilio' => $request->get('domicilio'),          
                                    'numero_de_telefono' => $request->get('numero_de_telefono'), 
                                ]);

            $cliente->save();

            return response()->json($cliente);
        }
    }

   
    public function show($id)
    {

        $cliente = Cliente::find($id);

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
        $cliente = Cliente::find($id);

        if($cliente) {

            $cliente->update($request->all());

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
