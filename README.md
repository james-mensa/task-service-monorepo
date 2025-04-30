### 🔐 Authentication-Based Task Event Service (Clean Architecture)
A full-stack monorepo for a Task & Event Management Service built with **.NET Web API** and **React.js + Vite**, following **Clean Architecture** principles.

##  Project Structure 
```bash
task-service-monorepo/
├── backend/             # .NET Web API backend service
├── frontend-web/        # React/Vue frontend
└── README.md            # Project documentation
```
## Workspaces

- `backend/` — The backend service
- `frontend-web/` — The web client



## Backend Structure
```bash
src/
├── backend.Api/               # Contains controllers, routes, and API endpoint definitions for handling client requests.
├── backend.Core/              # Contains core business logic,  models,Dtos, interfaces, and application services.
└── backend.Infrastructure/    # Contains implementation details like database access, and service integrations,.
```
## Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x
- **.NET 7 SDK** 
- (Optional) **Docker** for sql server


### Installation Guide
1. Clone the Repository

```bash
git clone https://github.com/james-mensa/task-service-monorepo.git
cd task-service-monorepo
```
### 🛠 Installation - App Service

```bash
# Navigate to the project root
cd task-service-monorepo

# Start SQL Server using Docker
cd backend/scripts
./sql_docker.sh up

# Run the backend API
cd ../src/backend.Api
dotnet run

# Run the frontend web application
cd ../../../frontend-web

# Copy environment variables file
cp .env.sample .env

# Install dependencies and start the dev server
npm install
npm run dev
```


