<?php

namespace App\Http\Requests\TaskRequest;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TaskStoreRequest extends FormRequest
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

        $listTaskId = $this->input('list_task_id');

        return [
            'list_task_id' => ['required', 'exists:list_tasks,id'],
            'name' => [
                'required',
                Rule::unique(table: 'tasks', column: 'name')
                    ->where(fn($query) => $query->where('list_task_id', $listTaskId)),
            ],
            'status_id' => ['required', 'exists:statuses,id'],
            'priority_id' => ['required', 'exists:priorities,id'],
            'due_date' => ['required'],
            'assignees' => ['array', 'required'],
            'assignees.*' => ['exists:users,id']
        ];
    }
}
