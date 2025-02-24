# TravelMate

TravelMate is a modern full‑stack application for travel planning and itinerary management. It features a robust NestJS backend with a GraphQL API powered by Prisma for PostgreSQL, and a Next.js frontend with Apollo Client integration and Tailwind CSS styling. The entire development environment is containerized using Docker and Docker Compose, and the project leverages Yarn Workspaces, automated testing, linting, commit hooks, and CI/CD workflows via GitHub Actions. Detailed code coverage reports are generated and published via Codecov.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Docker Configuration](#docker-configuration)
- [Testing and CI/CD](#testing-and-cicd)
- [Coverage Reports](#coverage-reports)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Secure login and registration with JWT.
- **Itinerary Management:** Create, view, update, and delete travel itineraries.
- **Destination Search & Interactive Maps:** Search destinations with interactive map integration.
- **GraphQL API:** Built with NestJS and Prisma for efficient data management.
- **Modern Frontend:** Next.js application with Apollo Client and Tailwind CSS.
- **Dockerized Environment:** Consistent development and deployment using Docker and Docker Compose.
- **Automated Testing & Quality Assurance:** Comprehensive unit and integration tests, along with commit hooks (Husky, lint‑staged), ESLint, and Prettier.
- **CI/CD and Coverage Reports:** GitHub Actions automate builds, tests, and deployments. Detailed coverage reports are generated and published via Codecov.

## Tech Stack

- **Backend:**
  - NestJS, GraphQL, Prisma, PostgreSQL
- **Frontend:**
  - Next.js, Apollo Client, Tailwind CSS
- **DevOps & Tooling:**
  - Docker, Docker Compose, Yarn Workspaces, Husky, lint‑staged, ESLint, Prettier, GitHub Actions, Codecov

## Project Structure

The project is organized as a Yarn Workspace with two main packages:

- **packages/backend:** Contains the NestJS backend, including modules for authentication, itineraries, destinations, maps, and database integration using Prisma.
- **packages/frontend:** Contains the Next.js frontend, including pages for authentication (login and registration), a dashboard, shared components (NavBar, UserProfile, useAuth), and Apollo Client setup.

For a detailed view, refer to the repository’s file tree.

## Development Setup

1. **Clone the Repository:**

   ```
   git clone <repository-url>
   cd travelmate
   ```

2. **Install Dependencies:**

   ```
   yarn install
   ```

3. **Environment Variables:**

   - In `packages/frontend/.env.local`, set:
     
     ```
     NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3001/graphql
     ```

   - In `packages/backend/.env`, configure your PostgreSQL connection and other backend-specific environment variables.

4. **Start the Development Environment:**

   Use Docker Compose with live reloading:
   
   ```
   docker-compose up --build
   ```

   - Frontend runs on [http://localhost:3000](http://localhost:3000)
   - Backend GraphQL API runs on [http://localhost:3001/graphql](http://localhost:3001/graphql)

## Docker Configuration

- **docker-compose.yml:** Defines services for the PostgreSQL database, backend, and frontend.
- **docker-compose.override.yml:** Adds volume mounts and development commands for live reloading.
- **Dockerfiles:** Located in `packages/backend` and `packages/frontend`, these files build the container images.

## Testing and CI/CD

- **Local Testing:**
  - Run tests for all packages:
    
    ```
    yarn test
    ```

  - Run tests for each package:
    
    ```
    yarn workspace backend test
    yarn workspace frontend test
    ```

  - Generate coverage reports:
    
    ```
    yarn coverage
    ```

- **CI/CD:**
  GitHub Actions are configured (see `.github/workflows/ci.yml`) to run linting, tests, builds, and coverage on push and pull requests.

- **Commit Hooks:**
  Husky and lint‑staged enforce code quality before commits and pushes.

## Coverage Reports

Coverage reports are generated for both the backend and frontend. For a rendered view of the reports, visit our Codecov page:

[https://app.codecov.io/gh/beingforthebenefit/TravelMate](https://app.codecov.io/gh/beingforthebenefit/TravelMate)

## Contributing

Contributions are welcome! Please adhere to the following guidelines:

1. **Code Style:** Follow our ESLint and Prettier configurations.
2. **Testing:** Write comprehensive tests for new features and bug fixes.
3. **Commit Messages:** Use clear and descriptive commit messages.
4. **Pull Requests:** Open a pull request with a clear description of your changes. Ensure all tests pass and CI checks are green.

## License

This project is licensed under the MIT License. See the ``` LICENSE ``` file for details.
