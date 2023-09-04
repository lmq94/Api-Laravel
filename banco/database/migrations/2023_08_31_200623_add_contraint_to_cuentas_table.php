<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cuentas', function (Blueprint $table) {
            $table->foreignId('id_cliente')
                ->constrained(table: 'clientes',indexName: 'Cuentas_Clientes_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
            //

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cuentas', function (Blueprint $table) {
            //
        });
    }
};
