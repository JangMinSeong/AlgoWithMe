from fastapi import FastAPI
from routers import execute, mark

app = FastAPI()
app.include_router(execute.router)
app.include_router(mark.router)