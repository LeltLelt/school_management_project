<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TimetableController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ExamResultController;
use App\Http\Controllers\StudentEnrollmentController;
use App\Http\Controllers\TimetableGroupController;

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);


Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('students', StudentController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('student-enrollments',StudentEnrollmentController::class);
    Route::apiResource('classes', ClassController::class);
    Route::apiResource('subjects', SubjectController::class);
    Route::apiResource('timetables', TimetableController::class);
    Route::apiResource('attendances', AttendanceController::class);
    Route::apiResource('exam-results', ExamResultController::class);
    Route::apiResource('timetable_groups', TimetableGroupController::class);
    });

