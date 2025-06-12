# Usa una imagen base con soporte de Python y build tools
FROM python:3.8-slim

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    gfortran \
    python3-dev \
    libatlas-base-dev \
    && apt-get clean

# Define el directorio de trabajo
WORKDIR /app

# Copia el contenido del proyecto a la imagen
COPY . .

# Actualiza pip y luego instala las dependencias Python
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expone el puerto (opcional para claridad)
EXPOSE 5000

# Comando que ejecuta tu backend
CMD ["python", "app.py"]
