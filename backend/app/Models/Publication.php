<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Publication extends Model {
    protected $fillable = ['faculty_id', 'title', 'journal_name', 'year', 'issn', 'link', 'status'];
    public function faculty() { return $this->belongsTo(Faculty::class); }
}
