<?php

namespace Database\Seeders;

use App\Models\Office;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(OfficeSeeder::class);
        $this->call(PrioritySeeder::class);
        $this->call(StatusSeeder::class);

        $users = [
            [
                'name' => 'Zyrus Vince B. Famini',
                'username' => 'admin',
                'office_id' => 1,
                'password' => 'admin123',
            ],
        ];

        foreach ($users as $data) {
            User::firstOrCreate(
                ['username' => $data['username']],
                [
                    'name' => $data['name'],
                    'office_id' => $data['office_id'],
                    'password' => Hash::make($data['password']),
                    'email_verified_at' => now(),
                ]
            );
        }
    }
}
