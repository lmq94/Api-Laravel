<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.2023_08_23_165312_create_cuentas_table.php
     */
    public function up(): void
    {
        if (!Schema::hasTable("cuentas")){
            Schema::create('cuentas', function (Blueprint $table) {
                $table->id();
                $table->bigInteger('saldo');
                $table->string('tipo_de_cuenta');
                $table->string('moneda');
                $table->timestamps();

            });
        }


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cuentas');
    }
};
