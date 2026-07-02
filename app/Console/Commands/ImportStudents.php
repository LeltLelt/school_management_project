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
    protected $signature = 'import-students {--file=}'; 

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
        $path = $this->option('file');
        if (!$path){
            $this->error("Please provide CSV file using --file option");
            return; 
        }
        if (!file_exists($path)){
            $this->error("CSV file not found!");
            return;
        }
        $file = fopen($path, 'r');
        $header = fgetcsv($file);

        while ($row = fgetcsv($file)) {
            $data = array_combine($header,$row);
            Student::create([
                'name'=> $data['name'] ,
                'email'=>$data['email'],
                'phone'=>$data['phone'],
            ]);
        }
    fclose($file);
    $this->info("Students imported successfully!");
    }
}