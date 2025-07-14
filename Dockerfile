# Dockerfile pour le backend FastAPI
FROM python:3.11-slim

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de requirements
COPY backend/requirements.txt .

# Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Copier le code de l'application
COPY backend/ .

# Exposer le port
EXPOSE 8000

# Variables d'environnement par défaut
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Commande de démarrage
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]