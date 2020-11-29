<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::paginate(9);

        if ($products) {
            return response()->json([
                'products' => $products,
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'message' => 'Nada encontrado',
            ], Response::HTTP_NO_CONTENT);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name;
        $product->price = $request->price;
        $product->description = $request->description;
        $product->sold = false;
        $product->user_id = Auth::user()->id;
        $product->save();

        for ($i = 0; $i < count($request->allFiles()['images']); $i++) {

            $file = $request->allFiles()['images'][$i];

            $productImage = new ProductImage();
            $productImage->product_id = $product->id;
            $filepath = $file->store('products/images', 'public');
            $productImage->path = $filepath;
            $productImage->save();

            unset($productImage);
        }

        return response()->json([
            'product' => $product,
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)->first();

        if ($product) {
            return response()->json([
                'product' => $product,
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'error' => 'Produto não encontrado',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
