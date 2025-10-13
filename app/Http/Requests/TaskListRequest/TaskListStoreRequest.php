<?php

namespace App\Http\Requests\TaskListRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskListStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                Rule::unique('list_tasks', 'name')
                    ->where('space_id', $this->space_id)
                    ->whereNull('deleted_at'),
            ],
        ];
    }
}
