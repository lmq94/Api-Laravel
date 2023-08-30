<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Cliente extends Model
{
    use HasFactory;

    protected $fillable = ['alias', 'city', 'dni'];

    protected $guarded = ['id'];

    public function cuentas(): HasMany
    {
        return $this->hasMany(Cuenta::class, 'id_cliente', 'id');
    }
}
