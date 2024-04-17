from fastapi import FastAPI
from routers import execute

app = FastAPI()
app.include_router(execute.router)
