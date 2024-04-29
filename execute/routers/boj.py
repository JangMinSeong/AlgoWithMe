from fastapi import  APIRouter, HTTPException
from fastapi.responses import JSONResponse
import subprocess
import os
from  pydantic import BaseModel
from typing import List
import time

router = APIRouter(
    prefix = "/boj",
    tags = ["boj"]
)

class TestCase(BaseModel):
    input: str
    output: str

class CodeTest(BaseModel):
    code: str
    limit_time: int
    test_cases: List[TestCase]

@router.post("/python")
async def mark_boj_python(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    try:
        compile(code_test.code, "main.py", "exec")
    except SyntaxError as e:
        return {"status": 400, "error": str(e)} # 컴파일 에러
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
                if process.returncode != 0: # 런타임 에러
                    results.append({"status":400, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
                os.remove(path)
    return {"status": 200, "results": results}

@router.post("/java")
async def mark_boj_java(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "Main.java")
    class_path = os.path.join(dir, "Main")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["javac", path], capture_output=True, text=True)
    if compile_process.returncode != 0: # 컴파일 에러
        return {"status": 400, "error": compile_process.stderr}
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
                if run_process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                run_process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(class_path + ".class"):
        os.remove(class_path + ".class")
    return {"status": 200, "results": results}

@router.post("/c")
async def mark_boj_c(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.c")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["gcc", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return {"status": 400, "error": compile_process.stderr}
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
                if run_process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                run_process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(executable_path):
        os.remove(executable_path)
    return {"status": 200, "results": results}

@router.post("/cpp")
async def mark_boj_cpp(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.cpp")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["g++", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return {"status": 400, "error": compile_process.stderr}
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
                if run_process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                run_process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(executable_path):
        os.remove(executable_path)
    return {"status": 200, "results": results}