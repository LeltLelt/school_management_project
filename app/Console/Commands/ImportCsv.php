<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Student;

class ImportCsv  extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import-csv {--model=} {--file=}'; 

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
        $model=$this->option('model');
        $path = $this->option('file');
        if (!$model){
            $this->error("Please provide modele using --model option");
            return; 
        }
        if (!$path){
            $this->error("Please provide CSV file using --file option");
            return; 
        }
        if (!file_exists($path)){
            $this->error("CSV file not found!");
            return;
        }
        $modelClass = "App\\Models\\{$model}";
        if (!class_exists($modelClass)){
            $this->error("Model {$model} not found!");
            return;
        }
        $file = fopen($path, 'r');
        $header = fgetcsv($file);

        while ($row = fgetcsv($file)) {
            $data = array_combine($header,$row);
            $modelClass::create($data);
        }
    fclose($file);
    $this->info("{$model} imported successfully!");
    }
}