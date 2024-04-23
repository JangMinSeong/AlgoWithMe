from fastapi import FastAPI
from routers import execute, boj, swea, programmers

app = FastAPI()
app.include_router(execute.router)
app.include_router(boj.router)
app.include_router(swea.router)
app.include_router(programmers.router)