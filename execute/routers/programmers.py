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
    problem: str
    answer: str

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
    try:
        compile(code_test.main, "main.py", "exec")
    except SyntaxError as e:
        return {"status": 422, "error": str(e)} # 컴파일 에러
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
                output, errors = process.communicate(input=test_case.problem, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
                if process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
                else:
                    results.append({"status": 200, "input": test_case.problem, "expected": test_case.answer, "got": output.strip(), "passed": output.strip() == test_case.answer, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                process.kill()
                errors = 'Time limit exceeded'
                results.append({"status": 408, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
                os.remove(path)
    if os.path.exists(solution_path):
                os.remove(solution_path)
    return {"status": 200, "results": results}

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
        return {"status": 422, "error": compile_process.stderr}
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
                output, errors = run_process.communicate(input=test_case.problem, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
                if run_process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.problem, "expected": test_case.answer, "got": output.strip(), "passed": output.strip() == test_case.answer, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                run_process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
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
    return {"status": 200, "results": results}

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
        return {"status": 422, "error": compile_process.stderr}
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
                output, errors = run_process.communicate(input=test_case.problem, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
                if run_process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
                else:
                    results.append({"status":200, "input": test_case.problem, "expected": test_case.answer, "got": output.strip(), "passed": output.strip() == test_case.answer, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                run_process.kill()
                errors = 'Time limit exceeded'
                results.append({"status":408, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    if os.path.exists(solution_path):
        os.remove(solution_path)
    return {"status": 200, "results": results}

@router.post("/cpp")
async def mark_programmers_cpp(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")
    executable_path = os.path.join(dir, "main")
    with open(path, "w", encoding='utf-8') as file:
        file.write(create_cpp_main(code_test.main, code_test.solution))
    try:
        compile(code_test.main, "main.py", "exec")
    except SyntaxError as e:
        return {"status": 422, "error": str(e)} # 컴파일 에러
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
                output, errors = process.communicate(input=test_case.problem, timeout=10)
                elapsed_time = time.perf_counter() - start_time
                elapsed_time_ms = int(elapsed_time * 1000)
                if process.returncode != 0: # 런타임 에러
                    results.append({"status": 400, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
                else:
                    results.append({"status": 200, "input": test_case.problem, "expected": test_case.answer, "got": output.strip(), "passed": output.strip() == test_case.answer, "execution_time": elapsed_time_ms})
            except subprocess.TimeoutExpired: # 시간 초과
                process.kill()
                errors = 'Time limit exceeded'
                results.append({"status": 408, "input": test_case.problem, "expected": test_case.answer, "got": errors, "passed": False})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
        os.remove(path)
    return {"status": 200, "results": results}

def create_cpp_main(main: str, solution:str):
    return "import cppyy\n" + "cppyy.cppdef(\"\"\"\n" + solution + "\"\"\"\n)\n" + main