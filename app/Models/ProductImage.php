<?php

namespace App\Models;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $table = 'product_images';
    public $timestamps = false;
    protected $appends = ['image_path_url'];
    protected $hidden = ['path'];

    /**
     * Return the URL Image Full Path
     *
     * @return string
     */
    public function getImagePathUrlAttribute(): string
    {
        return config('app.url') . 'storage/' . $this->attributes['path'];
    }

    /**
     * Undocumented function
     *
     * @return void
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
