<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Cliente extends Model
{
    use HasFactory;

    protected $fillable = ['alias', 'city', 'dni'];

    protected $hidden = [
        "id"

    ];



    public function cuentas()
    {
        return $this->hasMany(Cuenta::class, 'id_cliente');
    }
}
