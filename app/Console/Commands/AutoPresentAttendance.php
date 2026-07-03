<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;
use App\Models\Attendance;

class AutoPresentAttendance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'attendance:auto-present';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Automatically mark all students as Present';

    /**
     * Execute the console command.
     */
    public function handle()
    {
       $student = Student::all();
       foreach ($student as $student){
        Attendance::firstOrCreate([
            'student_id'=>$student->id,
            'date'=>now()->toDateString(),
        ],
        [
            'status'=> 1,
        ]);
       }
       $this->info('Attendance marked successfully!');
    }
}
