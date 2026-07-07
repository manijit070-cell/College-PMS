<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Faculty extends Model {
    protected $table = 'faculty';
    protected $fillable = ['user_id', 'department_id', 'employee_id', 'designation', 'joining_date'];
    public function user() { return $this->belongsTo(User::class); }
    public function department() { return $this->belongsTo(Department::class); }
    public function publications() { return $this->hasMany(Publication::class); }
}
