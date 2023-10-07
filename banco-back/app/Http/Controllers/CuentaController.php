<?php

namespace App\Http\Controllers;

use App\Models\Cuenta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class CuentaController extends Controller
{


    protected $rules = [
        'saldo' => 'required|string|max:255',
        'tipo_de_cuenta' => 'required|in:Caja de ahorro,Plazo fijo,Cuenta corriente',
        'moneda' => 'required|in:Peso,Dolar,Euro,Yen,Yuan',
        
    ];

    protected $messages = [
        'required' => 'El campo :attribute es obligatorio.',
        'saldo.string' => 'El campo Saldo debe ser una cadena de caracteres.',
        'saldo.max' => 'El campo Saldo no debe tener más de :max caracteres.',
        'in' => 'El :attribute no es válido.',
    ];
   
     
    
   
    public function index( Request $request)
    {
        if($this->isAdmin($request)) {

            $cuentas = Cuenta::all();

            return response()->json($cuentas); 
        }
        else
            return response()->json("No cuentas con los permisos para esta peticion", 403);
    }

    

   
    public function create()
    {
        
    }

    
    public function store(Request $request)

    {
            $validator = Validator::make(["saldo" => $request->get("saldo"),
                                            "tipo_de_cuenta" => $request->get("tipo_de_cuenta"),
                                            "moneda" => $request->get("moneda"),], $this->rules, $this->messages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
            else {



                $cuenta = new Cuenta([  "saldo" => $request->get("saldo"),
                                        "tipo_de_cuenta" => $request->get("tipo_de_cuenta"),
                                        "moneda" => $request->get("moneda"),
                                        "cbu"  => implode('', array_map(fn() => mt_rand(0, 9), range(1, 22))),
                                        ]);

                if( $this->isAdmin($request)){
                    
                    $cuenta->setAttribute('id_cliente', $request->get('id_cliente'));    
                }  
                else
                    $cuenta->setAttribute('id_cliente',$request->get('user')->getAttribute('id_cliente'));                   


                $cuenta->save();

                return response()->json($cuenta, 200);

        }   

    }

   
    public function show( int $id)
    {
        $cuenta = Cuenta::find($id);

        if($cuenta)

            return response()-> json($cuenta);

        else
            return response()->json('No se encuentra la cuenta', 204);

    }

  
    public function edit(Cuenta $cuenta)
    {
        //
    }


    public function update(Request $request, $id)
    {
        $cuenta = Cuenta::find($id);


        if($cuenta) {

            $cuenta->update($request->all());

            return response()->json($cuenta);

        }
        else
            return response()->json('No se encuentra la cuenta', 204);

    }

    
    public function destroy( $id)
    {
        Cuenta::destroy($id);

        return response()->json('La cuenta con ha sido eliminada');
    }


}
