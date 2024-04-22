from fastapi import  APIRouter, HTTPException
from fastapi.responses import JSONResponse
import subprocess
import os
from  pydantic import BaseModel
import time

router = APIRouter(
    prefix = "/swea",
    tags = ["swea"]
)

class CodeTest(BaseModel):
    code: str
    limit_time: int
    input: str
    output: str

@router.post("/python")
async def mark_python_code(code_test: CodeTest):
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")
    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
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
            output, errors = process.communicate(input=code_test.input, timeout=code_test.limit_time)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired: # time out
            process.kill()
            errors = 'Time limit exceeded'
        if process.returncode != 0: # error
            results={"input": code_test.input, "expected": code_test.output, "got": errors, "passed": False}
        else:
            results = mark_test_case(code_test=code_test, output=output, elapsed_time_ms=elapsed_time_ms)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(path):
            os.remove(path)
    return results

@router.post("/java")
async def mark_python_code(code_test: CodeTest):
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "Solution.java")
    class_path = os.path.join(dir, "Solution")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["javac", path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    try:
        # run
        start_time = time.perf_counter()
        run_process = subprocess.Popen(
            ["java", "-cp", dir, "Solution"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        try:
            output, errors = run_process.communicate(input=code_test.input, timeout=code_test.limit_time)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired: # time out
            run_process.kill()
            errors = 'Time limit exceeded'
        if run_process.returncode != 0: # error
            results={"input": code_test.input, "expected": code_test.output, "got": errors, "passed": False}
        else:
            results = mark_test_case(code_test=code_test, output=output, elapsed_time_ms=elapsed_time_ms)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(class_path + ".class"):
            os.remove(class_path + ".class")
    return results

@router.post("/c")
async def mark_C_code(code_test: CodeTest):
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.c")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["gcc", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    try:
        # run
        start_time = time.perf_counter()
        run_process = subprocess.Popen(
            [executable_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        try:
            output, errors = run_process.communicate(input=code_test.input, timeout=code_test.limit_time)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired: # time out
            run_process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if run_process.returncode != 0: # error
            results={"input": code_test.input, "expected": code_test.output, "got": errors, "passed": False}
        else:
            results = mark_test_case(code_test=code_test, output=output, elapsed_time_ms=elapsed_time_ms)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(executable_path):
            os.remove(executable_path)
    return results

@router.post("/cpp")
async def mark_C_code(code_test: CodeTest):
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.cpp")
    executable_path = os.path.join(dir, "main")

    with open(path, "w", encoding='utf-8') as file:
        file.write(code_test.code)
    # compile
    compile_process = subprocess.run(["g++", path, "-o", executable_path], capture_output=True, text=True)
    if compile_process.returncode != 0:
        return JSONResponse(status_code=400, content={"error": compile_process.stderr})
    try:
        # run
        start_time = time.perf_counter()
        run_process = subprocess.Popen(
            [executable_path],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        try:
            output, errors = run_process.communicate(input=code_test.input, timeout=code_test.limit_time)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired: # time out
            run_process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if run_process.returncode != 0: # error
            results={"input": code_test.input, "expected": code_test.output, "got": errors, "passed": False}
        else:
            results = mark_test_case(code_test=code_test, output=output, elapsed_time_ms=elapsed_time_ms)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(executable_path):
            os.remove(executable_path)
    return results

def mark_test_case(code_test: CodeTest, output: str, elapsed_time_ms: int):
    expected_lines = code_test.output.split('\n')
    output_lines = output.strip().split('\n')
    matches = 0
    line_results = []
    for exp, out in zip(expected_lines, output_lines):
        is_match = exp == out
        line_results.append({"expected": exp, "got": out, "match": is_match})
        if is_match:
            matches += 1
    return {
        "input": code_test.input,
        "expected": code_test.output,
        "got": output.strip(),
        "passed": matches == len(expected_lines),
        "test_case": len(expected_lines),
        "matches": matches, # 맞은 갯수
        "execution_time": elapsed_time_ms,
        "details": line_results
    }