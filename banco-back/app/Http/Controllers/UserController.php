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


    private function buscaUser($id){
        $users = User::all();

        return $users->find($id);
    }



  
    public function create()
    {
        
    }

  
    public function store(Request $request)
    {

        $user = new User([  "name" => $request->get("name"),
            "email" => $request->get("email"),
            "password" => $request->get("password"),
            "rol" => $request->get("rol"),
            "id_cliente" => $request->get("id_cliente")]);



        $image = $request->file("profile_picture");
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('/images', $imageName);

        $user->setAttribute('profile_picture','images/' . $imageName);

        if($request->get('rol') == "admin"){

            $mockCliente = new Cliente(["alias" => "test", "city" => "Tandil", "dni" => "123456"]) ;

            $mockCliente->save();

            $user->setAttribute("id_cliente",$mockCliente->getAttribute("id"));
        }


        $user->save();

        return response()->json($user);

    }

  
    public function show( Request $request)
    {
        $user = $this->buscaUser($request->get("user")->getAttribute("id"));


        if($user)

            return  response()->json($user);

        else
            return response()->json('No se encuentra el usuario solicitado', 204);

    }

    public function getImage($filename)
    {


        $url = asset($filename);

        return response()->json(['url' => $url]);

    }

   
    public function edit(Cuenta $cuenta)
    {
        
    }

   
    public function update(Request $request, $id)

    
    {
        
        $user = $this->buscaUser($id);
       

        if($user) {

            $image = $request->file("profile_picture");
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('/images', $imageName);


            $user->update([  "name" => $request->get("name"),
            "email" => $request->get("email"),
            "profile_picture" => 'images/' . $imageName
            
            ]);

        
             

            return response()->json($user);

        }
        else
            return response()->json('No se encuentra el usuario solicitado', 204);

    }

   
    public function destroy($id)
    {
        user::destroy($id);

        return response()->json('EL usuario ha sido eliminado');
    }
    

    public function resetPassword(Request $request){

       $user = User::all()->where('email', $request->get("user")->getAttribute("email"))->first();
       

        if(password_verify( $request->get("currentPassword"),$user->getAttribute("password"))) {

            $user->update(["password" => $request->get("newPassword")]);

            return  response()->json("Se actualizo con exito la contraseña");
       }

      else
        
        return response()->json("Contraseña actual incorrecta", 401);
    }


}
