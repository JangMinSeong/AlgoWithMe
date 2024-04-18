from fastapi import  APIRouter, HTTPException
import subprocess
import os
from  pydantic import BaseModel
from typing import List

router = APIRouter(
    prefix = "/mark",
    tags = ["mark"]
)

class TestCase(BaseModel):
    input: str
    output: str

class CodeTest(BaseModel):
    code: str
    test_cases: List[TestCase]

@router.post("/python")
async def mark_python_code(code_test: CodeTest):
    results = []
    dir = os.getenv('BASE_DIR', 'C:\\tmp')
    path = os.path.join(dir, "main.py")
    with open(path, "w") as file:
        file.write(code_test.code)
    for test_case in code_test.test_cases:
        try:
            process = subprocess.Popen(
                ["python", path],
                stdin=subprocess.PIPE, 
                stdout=subprocess.PIPE, 
                stderr=subprocess.PIPE, 
                text=True
            )
            output, errors = process.communicate(input=test_case.input)
            if process.returncode != 0:
                results.append({"input": test_case.input, "expected": test_case.output, "got": errors, "passed": False})
            else:
                results.append({"input": test_case.input, "expected": test_case.output, "got": output.strip(), "passed": output.strip() == test_case.output})
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    if os.path.exists(path):
                os.remove(path)
    return results

