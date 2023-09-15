<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


;


class Cuenta extends Model
{
    use HasFactory;
    protected $fillable = ['id_cliente','saldo', 'tipo_de_cuenta', 'moneda'];

    protected $hidden = [
        "id",
        'id_cliente',

    ];


    public function cliente()
    {
        return $this->BelongsTo(Cliente::class);

    }

}
