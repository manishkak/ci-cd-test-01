# User Authentication System - Setup & Deployment Guide

## Overview
A full-stack user authentication system with:
- **Backend:** PHP with SQLite, user registration, login/logout, session management
- **Frontend:** React + Vite with modern UI
- **Containerization:** Docker & Docker Hub
- **CI/CD:** Azure Pipelines for automated deployment

---

## Local Development Setup

### Prerequisites
- Docker installed
- Docker Compose installed
- Git

### Step 1: Clone or Navigate to Repo
```bash
cd C:\Users\manis\projects\ci-cd-test-01
```

### Step 2: Run with Docker Compose
```bash
docker-compose -f docker-compose-user-auth.yml up -d
```

This will:
- Build and run the PHP backend on `http://localhost:8000`
- Start the React frontend on `http://localhost:5173`
- Create a network between frontend and backend

### Step 3: Access the App
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000

### Step 4: Test Locally
1. Register a new user
2. Login with credentials
3. View your user profile
4. Logout

---

## Backend API Endpoints

Base URL: `http://localhost:8000`

### Register
```
POST /index.php?action=register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "full_name": "John Doe"
}
```

### Login
```
POST /index.php?action=login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepass123"
}
```

### Get User Info
```
GET /index.php?action=user-info
(Requires active session)
```

### Logout
```
GET /index.php?action=logout
```

---

## Containerization & Deployment

### Build Backend Docker Image
```bash
cd backend/user-auth
docker build -t user-auth-backend:latest .
```

### Tag for Docker Hub
```bash
docker tag user-auth-backend:latest manishkak/user-auth-backend:latest
```

### Push to Docker Hub
```bash
docker login
docker push manishkak/user-auth-backend:latest
```

### Run Container Locally
```bash
docker run -p 8000:80 manishkak/user-auth-backend:latest
```

---

## CI/CD Workflow

### Azure Pipelines Integration
Update your [`azure-pipelines.yml`](../../azure-pipelines.yml) to include the user-auth backend:

```yaml
- name: Build and push user-auth backend
  task: Docker@2
  inputs:
    command: buildAndPush
    containerRegistry: $(dockerRegistryServiceConnection)
    repository: manishkak/user-auth-backend
    dockerfile: backend/user-auth/Dockerfile
    tags: latest
```

### Automated Workflow
1. **Push code** to GitHub
2. **Azure Pipelines triggers** automatically
3. **Backend image** is built and pushed to Docker Hub
4. **Azure Web App for Containers** pulls the latest image
5. **App is live** with your changes

---

## Deploy to Azure

### Create New Web App for Containers
1. Go to Azure Portal
2. Create new App Service
3. Select Docker Container
4. Name: `user-auth-app`
5. Container Image: `manishkak/user-auth-backend:latest`
6. Port: 80

### Access Your App
After deployment, visit your Azure app URL (e.g., `https://user-auth-app.azurewebsites.net`)

---

## Database

The app uses **SQLite** for simplicity. The database file (`users.db`) is created automatically on first run.

**Database Schema:**
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

---

## Making Changes

### Local Development
1. Edit code locally
2. Changes are reflected immediately (hot reload in React, auto-restart in PHP)

### Deploy to Production
1. Commit and push to GitHub
2. Azure Pipelines automatically:
   - Tests the code
   - Builds Docker image
   - Pushes to Docker Hub
   - Deploys to Azure Web App

---

## Testing

### Backend Tests
```bash
cd backend/user-auth
composer install
vendor/bin/phpunit
```

### Frontend Tests
```bash
cd frontend/user-auth
npm install
npm test
```

---

## Troubleshooting

### Container won't start
- Check Docker logs: `docker logs <container-id>`
- Verify port 8000 is not in use

### Frontend can't reach backend
- Ensure both services are running: `docker-compose ps`
- Check network connectivity

### Database errors
- Ensure `/tmp` or working directory has write permissions
- Delete `users.db` and let the app recreate it

---

## Next Steps
- Add password reset functionality
- Implement email verification
- Add user profile editing
- Deploy frontend as separate containerized app
- Set up SSL/TLS certificates in Azure

