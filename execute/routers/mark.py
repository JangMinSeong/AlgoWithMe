from fastapi import  APIRouter, HTTPException
from fastapi.responses import JSONResponse
import subprocess
import os
from  pydantic import BaseModel
from typing import List
import time

router = APIRouter(
    prefix = "/mark",
    tags = ["mark"]
)

class TestCase(BaseModel):
    input: str
    output: str

class CodeTest(BaseModel):
    code: str
    limit_time: int
    test_cases: List[TestCase]

@router.post("/python")
async def mark_python_code(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
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
                output, errors = process.communicate(input=test_case.input, timeout=code_test.limit_time)
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
    return results

@router.post("/java")
async def mark_python_code(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "Main.java")
    class_path = os.path.join(dir, "Main")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["javac", path], capture_output=True, text=True)
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
                output, errors = run_process.communicate(input=test_case.input, timeout=code_test.limit_time)
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
    if os.path.exists(class_path + ".class"):
        os.remove(class_path + ".class")
    return results

@router.post("/c")
async def mark_python_code(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.c")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
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
                output, errors = run_process.communicate(input=test_case.input, timeout=code_test.limit_time)
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
    if os.path.exists(executable_path):
        os.remove(executable_path)
    return results

@router.post("/cpp")
async def mark_python_code(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.cpp")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
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
                output, errors = run_process.communicate(input=test_case.input, timeout=code_test.limit_time)
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
    if os.path.exists(executable_path):
        os.remove(executable_path)
    return results