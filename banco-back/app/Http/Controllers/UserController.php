<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use App\Models\Cuenta;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{


    protected $rules = [
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'rol' => 'required|in:normal,admin',
        'id_cliente' => 'required|unique:users,id_cliente|exists:clientes,id',
        'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048', 
    ];

    protected  $messages = [
        'required' => 'El campo :attribute es obligatorio.',
        'email.unique' => 'El email ya está en uso.',
        'id_cliente.unique' => 'Ya existe un usuario para ese cliente',
        'email' => 'El :attribute debe ser una dirección de correo electrónico válida.',
        'min' => 'La :attribute debe tener al menos :min caracteres.',
        'in' => 'El :attribute no es válido.',
        'exists' => 'El :attribute seleccionado no existe.',
        'image' => 'El :attribute debe ser una imagen válida.',
        'mimes' => 'El :attribute debe ser una imagen de tipo :values.',
        'max' => 'El :attribute no debe ser mayor de :max KB.',
    ];


    public function index(Request $request)
    {
        if($this->isAdmin($request)) {

            $users = User::all();

            return response()-> json($users);
        }

        else

            return response()->json("No cuentas con los permisos para esta peticion", 403);
    }


  
  
    public function create()
    {
        
    }

  
    public function store(Request $request){
       

            $validator = Validator::make($request->all(), $this->rules, $this->messages);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 400);
            }
            else {

                $user = new User([  "name" => $request->get("name"),
                        "email" => $request->get("email"),
                        "password" => $request->get("password"),
                        "rol" => $request->get("rol"),
                        "id_cliente" => $request->get("id_cliente")]);

                $image = $request->file("profile_picture");

                if($image) {

                    $imageName = time() . '.' . $image->getClientOriginalExtension();
                    $image->storeAs('/images', $imageName);
                    $user->setAttribute('profile_picture','images/' . $imageName);
                }    

                    if($request->get('rol') == "admin"){

                        $mockCliente = new Cliente(["alias" => "test", "city" => "Tandil", "dni" => "123456"]) ;

                        $mockCliente->save();

                        $user->setAttribute("id_cliente",$mockCliente->getAttribute("id"));
                    }

                    $user->save();

                    return response()->json($user);
            }         

    }

    public function show($id){
        $user = User::find($id);

        if($user)

            return  response()->json($user);

        else
            return response()->json('No se encuentra el usuario solicitado', 204);

    }


    

  
    public function showUserSession( Request $request)
    {
        $user = User::find($request->get("user")->getAttribute("id"));


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
        
        $user = User::find($id);

        if ($user) {
            $image = $request->file("profile_picture");
    
            
            $previousImage = $user->profile_picture;
    
            if ($image) {
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->storeAs('/images', $imageName);
                $user->setAttribute("profile_picture", 'images/' . $imageName);
    
               
                if ($previousImage) {
                    Storage::disk('public')->delete($previousImage);
                }
            }
    
            $user->update([ "name" => $request->get("name"),
                            "email" => $request->get("email"),]);
    
            return response()->json($user);
        } else {

            return response()->json('No se encuentra el usuario solicitado', 204);
        }
    }

   
    public function destroy($id)
    {
        $user = User::find($id);

        $imagePath = $user->profile_picture;

        if (Storage::disk('public')->exists($imagePath)) {

            Storage::disk('public')->delete($imagePath);
        }

        User::destroy($id);

        return response()->json('El usuario ha sido eliminado');
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
