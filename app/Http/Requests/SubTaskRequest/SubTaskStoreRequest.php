<?php

namespace App\Http\Requests\SubTaskRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SubTaskStoreRequest extends FormRequest
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
        $taskId = $this->input('task_id');

        return [
            'name' => [
                'required',
                'string',
                Rule::unique(table: 'sub_tasks', column: 'name')
                    ->where(fn($query) => $query->where('task_id', $taskId)),

            ],
            'task_id' => ['required', 'exists:tasks,id'],
            'status_id' => ['required', 'exists:statuses,id'],
            'priority_id' => ['required', 'exists:priorities,id'],
            'due_date' => ['required'],
            'assignees' => ['array', 'required'],
            'assignees.*' => ['exists:users,id']
        ];
    }
}
