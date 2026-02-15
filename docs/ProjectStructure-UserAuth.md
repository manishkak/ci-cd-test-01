# Project Structure

## Directory Layout

```
ci-cd-test-01/
│
├── backend/
│   ├── index.php                  # Original simple PHP app
│   ├── test.php
│   ├── test2.php
│   ├── composer.json
│   ├── Dockerfile                 # Original backend Docker config
│   ├── phpunit.xml
│   ├── vendor/
│   ├── tests/
│   │   └── SampleTest.php
│   ├── src/
│   │
│   └── user-auth/                 # NEW: User Auth System Backend
│       ├── index.php              # PHP API endpoints
│       ├── composer.json
│       ├── Dockerfile
│       ├── phpunit.xml
│       ├── tests/
│       │   └── AuthTest.php
│       └── src/
│
├── frontend/
│   ├── vite-project/              # Original React app
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   └── ...
│   │
│   └── user-auth/                 # NEW: User Auth System Frontend
│       ├── src/
│       │   ├── main.jsx
│       │   ├── App.jsx
│       │   ├── App.test.js
│       │   ├── index.css
│       │   └── pages/
│       │       ├── Register.jsx
│       │       ├── Login.jsx
│       │       └── UserInfo.jsx
│       ├── index.html
│       ├── package.json
│       ├── vite.config.js
│       └── ...
│
├── .github/
│   └── workflows/
│       └── ci-cd-demo.yml         # GitHub Actions workflow
│
├── docs/
│   ├── BackendimagePushtoDockerHub.txt
│   ├── CreateAzureWebApp.txt
│   ├── FullFlowPushtoMain.txt
│   ├── PushLocalPHPRepotoDockerDesktop.txt
│   ├── SetupCICDwithDockerHubToAzureWebApp.txt
│   ├── What'sNext.txt
│   ├── WhatYouHaveOfficiallyAchieved.txt
│   └── UserAuthSystem-SetupGuide.md  # NEW: Complete setup guide
│
├── azure-pipelines.yml            # Azure DevOps pipeline
├── docker-compose-user-auth.yml   # NEW: Docker Compose for user-auth
└── ...
```

## What's New

### Backend (PHP + SQLite)
- User registration with validation
- Login with password hashing
- Session management
- User info retrieval
- PHPUnit tests

### Frontend (React + Vite)
- Modern responsive UI
- Registration page
- Login page
- User profile page
- Error handling and validation

### DevOps
- Docker Compose for local development
- Separate Dockerfile for user-auth backend
- Ready to integrate with Azure Pipelines

