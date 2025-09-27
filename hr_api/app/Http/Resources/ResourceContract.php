<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResourceContract extends JsonResource
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
            'sector' => new ResourceSector($this->whenLoaded('sector')),
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'type' => $this->type,
        ];
    }
}
