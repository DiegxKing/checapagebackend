FROM python:3.8-slim

# Evitar conflictos resolviendo todo con pip a la vez
COPY requirements.txt /app/requirements.txt
WORKDIR /app

# Instala compiladores necesarios
RUN apt-get update && apt-get install -y \
    build-essential \
    gfortran \
    python3-dev \
 && rm -rf /var/lib/apt/lists/*

# Actualiza pip y resuelve dependencias en una sola instrucción
RUN pip install --upgrade pip \
 && pip install --no-cache-dir -r requirements.txt

COPY . /app

CMD ["python", "app.py"]
