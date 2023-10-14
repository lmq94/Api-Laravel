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

        $rules = $this->rules;

        if ($request->get('rol') === 'admin') {
            // Eliminar la regla 'id_cliente' del conjunto de reglas
            unset($rules['id_cliente']);
        }

        $validator = Validator::make($request->all(), $rules, $this->messages);

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

                        $adminExists = User::where('rol', 'admin')->exists();

                        if ($adminExists) {
                            return response()->json(['error' => 'Ya existe una cuenta de administrador.'], 401);
                        }

                        $mockCliente = new Cliente(["alias" => "test", "city" => "Tandil", "dni" => "123456", "domicilio" => "En algun lugar", "numero_de_telefono" => "22345678"]) ;

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
    private function updateUser(Request $request, $user) {

        $image = $request->file("profile_picture");



        if ($image) {
            $previousImage = $user->profile_picture;
            $this->deleteImage($previousImage);
            $this->createImagen($user, $image);
        }


        $user->update([
            "name" => $request->get("name"),
            "email" => $request->get("email"),

        ]);
        return response()->json($user);




    }



    public function update(Request $request, $id) {

        if ($this->isAdmin($request)) {

            $user = User::find($id);

            if($user) {
                $this->updateUser($request, $user);

            }
            else
                return response()->json("No existe el usuario",204);

        } else {
            $userSession = $request->get('user');
            if ($userSession->getAttribute('id') == $id) {
                $this->updateUser($request, $userSession);

            }
            return
                response()->json("Esta no es tu cuenta", 401);

        }
    }





    private function createImagen($user,$image){
        $imageName = time() . '.' . $image->getClientOriginalExtension();
        $image->storeAs('/images', $imageName);
        $user->setAttribute("profile_picture", 'images/' . $imageName);

    }
    private function deleteImage ($imagePath){

        if (Storage::disk('public')->exists($imagePath)) {

            Storage::disk('public')->delete($imagePath);
        }
    }



    public function destroy(Request $request , $id = null)
    {
            if($this->isAdmin($request)) {


                $user = User::find($id);
                if($user) {
                    $imagePath = $user->profile_picture;
                    $this->deleteImage($imagePath);
                    if($user->getAttribute('rol') == 'admin')
                        Cliente::destroy($user->getAttribute('id_cliente'));
                    User::destroy($id);
                }
                else return response()->json("No existe el usuario", 204);
            }
            else {

                if($request->get('user')->getAttribute('id') == $id){
                    $userSession = $request->get('user');
                    $this->deleteImage($userSession->profile_picture);
                    $userSession->delete();
                }
                else return response()->json("Esta no es tu cuenta", 401);

            }

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
