<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResourceReview extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => new ResourceUser($this->whenLoaded('user')),
            'review_date' => $this->review_date,
            'score' => $this->score,
            'comments' => $this->comments
        ];
    }
}
