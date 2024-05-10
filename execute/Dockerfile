FROM python:3.12.2-slim

WORKDIR /execute

COPY requirements.txt .

RUN apt update && apt install -y \
    build-essential \
    openjdk-17-jdk\
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir --upgrade -r /execute/requirements.txt


COPY . /execute/

CMD ["uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8082"]