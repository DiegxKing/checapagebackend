FROM python:3.8-slim

WORKDIR /app

# Dependencias del sistema necesarias para instalar paquetes científicos
RUN apt-get update && apt-get install -y \
    build-essential \
    gfortran \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiamos los archivos
COPY requirements.txt .

# Instalación de dependencias (pip actualizado y sin caché)
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]
