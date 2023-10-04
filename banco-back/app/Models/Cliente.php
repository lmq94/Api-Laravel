<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Cliente extends Model
{
    use HasFactory;

    protected $fillable = ['id','alias', 'city', 'dni', 'domicilio', 'numero_de_telefono'];



    public function cuentas()
    {
        return $this->hasMany(Cuenta::class, 'id_cliente');
    }
}
