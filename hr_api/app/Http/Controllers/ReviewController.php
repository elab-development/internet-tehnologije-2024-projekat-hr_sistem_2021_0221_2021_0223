<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReviewController extends ResponseHandlerController
{
    public function index()
    {
        $reviews = \App\Models\Review::all();
        return $this->success(\App\Http\Resources\ResourceReview::collection($reviews), "Reviews retrieved successfully");
    }

    public function reviewsByUser($userId)
    {
        $reviews = \App\Models\Review::where('user_id', $userId)->get();
        return $this->success(\App\Http\Resources\ResourceReview::collection($reviews), "Reviews for user ID {$userId} retrieved successfully");
    }

    public function store(Request $request)
    {

        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'review_date' => 'required|date',
            'score' => 'required|string',
            'comments' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return $this->error("Validation Error", $validator->errors(), 422);
        }

        $review = \App\Models\Review::create($request->all());
        return $this->success(new \App\Http\Resources\ResourceReview($review), "Review created successfully", 201);
    }

    public function scores()
    {
        $scores = [
            \App\Models\Review::BELLOW_AVERAGE,
            \App\Models\Review::AVERAGE,
            \App\Models\Review::GOOD,
            \App\Models\Review::EXCELLENT,
            \App\Models\Review::OUTSTANDING,
        ];

        return $this->success($scores, "Review scores retrieved successfully");
    }

    public function destroy($id)
    {
        $review = \App\Models\Review::find($id);
        if (!$review) {
            return $this->error("Review not found", null, 404);
        }

        $review->delete();
        return $this->success(null, "Review deleted successfully");
    }
}
