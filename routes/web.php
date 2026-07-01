<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('students',StudentController::class);
Route::resource('teachers',TeacherController::class); 
Route::resource('sclasses',StudentController::class);
Route::resource('subjects',SubjectController::class);
Route::resource('timetables',TimetableController::class);
Route::resource('attendances',AttendanceController::class);
Route::resource('exam-results',ExamResultController::class);