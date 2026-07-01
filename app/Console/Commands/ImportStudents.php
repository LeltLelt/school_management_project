<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;

class ImportStudents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import-students';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import students from CSV file ';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $path = storage_path('app/students.csv');
        if (!file_exists($path)){
            $this->error("CSV file not found!");
            return;
        }
        $file = fopen($path, 'r');
        $header = fgetcsv($file);
        while ($row = fgetcsv($file)) {
            Student::create([
                'name'=> $row[0],
                'email'=>$row[1],
                'phone'=>$row[2],
                'class_id'=>$row[3],
            ]);
        }
    fclose($file);
    $this->info("Students imported successfully!");
    }
}