<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Department extends Model {
    protected $fillable = ['name', 'code'];
    public function faculty() { return $this->hasMany(Faculty::class); }
}
