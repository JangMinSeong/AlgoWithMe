from fastapi import APIRouter
from fastapi.responses import JSONResponse
import subprocess
import os
import time
from  pydantic import BaseModel

router = APIRouter(
    prefix = "/execute",
    tags = ["execute"]
)

class CodeExecution(BaseModel):
    code: str
    input: str = ""

@router.post("/python")
async def execute_python(code_execution: CodeExecution):
    
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.py")

    try:
        with open(path, "w", encoding='utf-8') as file:
            file.write(code_execution.code)
        start_time = time.perf_counter()
        process = subprocess.Popen(
            ["python", path],
            stdin=subprocess.PIPE, 
            stdout=subprocess.PIPE, 
            stderr=subprocess.PIPE, 
            text=True
        )
        try:
            output, errors = process.communicate(input=code_execution.input, timeout=5)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired:
            process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": errors})
        return {"output": output, "execution_time": elapsed_time_ms}
    finally:
        if os.path.exists(path):
            os.remove(path)

@router.post("/java")
async def execute_java(code_execution: CodeExecution):
    
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "Main.java")
    class_path = os.path.join(dir, "Main")

    try:
        with open(path, "w", encoding='utf-8') as file:
            file.write(code_execution.code)
        # compile
        compile_process = subprocess.run(["javac", path], capture_output=True, text=True)
        if compile_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": compile_process.stderr})
        # run
        start_time = time.perf_counter()
        run_process = subprocess.Popen(
            ["java", "-cp", dir, "Main"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        try:
            output, errors = run_process.communicate(input=code_execution.input, timeout=5)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired:
            run_process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if run_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": errors})
        return {"output": output, "execution_time": elapsed_time_ms}
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(class_path + ".class"):
            os.remove(class_path + ".class")

@router.post("/c")
async def execute_c(code_execution: CodeExecution):
    
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.c")
    executable_path = os.path.join(dir, "main")

    try:
        with open(path, "w", encoding='utf-8') as file:
            file.write(code_execution.code)
        # compile
        compile_process = subprocess.run(["gcc", path, "-o", executable_path], capture_output=True, text=True)
        if compile_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": compile_process.stderr})
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
            output, errors = run_process.communicate(input=code_execution.input, timeout=5)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired:
            run_process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if run_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": errors})
        return {"output": output, "execution_time": elapsed_time_ms}
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(executable_path):
            os.remove(executable_path)

@router.post("/cpp")
async def execute_cpp(code_execution: CodeExecution):
    
    dir = os.getenv('BASE_DIR', '/tmp')
    path = os.path.join(dir, "main.cpp")
    executable_path = os.path.join(dir, "main")

    try:
        with open(path, "w", encoding='utf-8') as file:
            file.write(code_execution.code)
        # compile
        compile_process = subprocess.run(["g++", path, "-o", executable_path], capture_output=True, text=True)
        if compile_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": compile_process.stderr})
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
            output, errors = run_process.communicate(input=code_execution.input, timeout=5)
            elapsed_time = time.perf_counter() - start_time
            elapsed_time_ms = int(elapsed_time * 1000)
        except subprocess.TimeoutExpired:
            run_process.kill()
            errors = 'Time limit exceeded'
            return JSONResponse(status_code=408, content={"error": errors})
        if run_process.returncode != 0:
            return JSONResponse(status_code=400, content={"error": errors})
        return {"output": output, "execution_time": elapsed_time_ms}
    finally:
        if os.path.exists(path):
            os.remove(path)
        if os.path.exists(executable_path):
            os.remove(executable_path)