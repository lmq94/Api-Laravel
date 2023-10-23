<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
            if (!DB::table('clientes')->where('alias', 'admin')->exists()) {
                $clienteId = DB::table('clientes')->insertGetId([
                    'alias' => 'admin',
                    'city' => 'Paraiso',
                    'dni' => '12345678',
                    'domicilio' => 'Nube 123',
                    'numero_de_telefono' => '12345',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);


                $imagePath = 'public/images/2304226.png';

                if (File::exists($imagePath)) {
                    $storageImagePath = 'images/' . basename($imagePath);
                    Storage::put($storageImagePath, File::get($imagePath));

                    DB::table('users')->insert([
                        'name' => 'admin',
                        'email' => 'admin@gmail.com',
                        'rol' => 'admin',
                        'password' => bcrypt('admin'),
                        'profile_picture' => $storageImagePath,
                        'id_cliente' => $clienteId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
};
