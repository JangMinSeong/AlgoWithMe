from fastapi import  APIRouter, HTTPException
from fastapi.responses import JSONResponse
import subprocess
import os
from  pydantic import BaseModel
from typing import List
import time

router = APIRouter(
    prefix = "/programmers",
    tags = ["programmers"]
)

class TestCase(BaseModel):
    input: str
    output: str

class CodeTest(BaseModel):
    main: str
    solution: str
    test_cases: List[TestCase]

@router.post("/python")
async def mark_programmers_python(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")
    solution_path = os.path.join(dir, "solution.py")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.main)
    with open(solution_path, "w", encoding='utf-8') as file:
        file.write(code_test.solution)
    for test_case in code_test.test_cases:
        start_time = time.perf_counter()
        try:
            process = subprocess.Popen(
                ["python", path],
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True
            )
            try:
                output, errors = process.communicate(input=test_case.input, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
            except subprocess.TimeoutExpired:
                process.kill()
                errors = 'Time limit exceeded'
            if process.returncode != 0:
                results.append({"input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
            else:
                results.append({"input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
                os.remove(path)
    if os.path.exists(solution_path):
                os.remove(solution_path)
    return results

@router.post("/java")
async def mark_programmers_java(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "Main.java")
    solution_path = os.path.join(dir, "Solution.java")
    class_path = os.path.join(dir, "Main")
    solution_class_path=os.path.join(dir, "Solution")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.main)
    with open(solution_path, "w", encoding='utf-8') as file:
        file.write(code_test.solution)
    # compile
    compile_process = subprocess.run(["javac", path, solution_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    # run
    for test_case in code_test.test_cases:
        try:
            start_time = time.perf_counter()
            run_process = subprocess.Popen(
                ["java", "-cp", dir, "Main"],
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True
            )
            try:
                output, errors = run_process.communicate(input=test_case.input, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
            except subprocess.TimeoutExpired:
                run_process.kill()
                errors = 'Time limit exceeded'
            if run_process.returncode != 0:
                results.append({"input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
            else:
                results.append({"input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(solution_path):
        os.remove(solution_path)
    if os.path.exists(class_path + ".class"):
        os.remove(class_path + ".class")
    if os.path.exists(solution_class_path + ".class"):
        os.remove(solution_class_path + ".class")
    return results

@router.post("/c")
async def mark_programmers_c(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.c")
    executable_path = os.path.join(dir, "main")
    solution_path = os.path.join(dir, "solution.h")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.main)
    with open(solution_path, "w", encoding='utf-8') as file:
        file.write(code_test.solution)
    # compile
    compile_process = subprocess.run(["gcc", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    # run
    for test_case in code_test.test_cases:
        try:
            start_time = time.perf_counter()
            run_process = subprocess.Popen(
                [executable_path],
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True
            )
            try:
                output, errors = run_process.communicate(input=test_case.input, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
            except subprocess.TimeoutExpired:
                run_process.kill()
                errors = 'Time limit exceeded'
            if run_process.returncode != 0:
                results.append({"input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
            else:
                results.append({"input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(solution_path):
        os.remove(solution_path)
    return results

@router.post("/cpp")
async def mark_programmers_cpp(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.cpp")
    executable_path = os.path.join(dir, "main")
    solution_path = os.path.join(dir, "solution.h")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.main)
    with open(solution_path, "w", encoding='utf-8') as file:
        file.write(code_test.solution)
    # compile
    compile_process = subprocess.run(["g++", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    # run
    for test_case in code_test.test_cases:
        try:
            start_time = time.perf_counter()
            run_process = subprocess.Popen(
                [executable_path],
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True
            )
            try:
                output, errors = run_process.communicate(input=test_case.input, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
            except subprocess.TimeoutExpired:
                run_process.kill()
                errors = 'Time limit exceeded'
            if run_process.returncode != 0:
                results.append({"input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
            else:
                results.append({"input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(solution_path):
        os.remove(solution_path)
    return results
