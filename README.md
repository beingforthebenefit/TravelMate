# TravelMate

TravelMate is a modern full-stack application for travel planning and itinerary management. It features a fully functional backend with a GraphQL API, a Next.js frontend with Apollo Client integration, and a Dockerized development environment that includes automated testing, linting, and CI/CD workflows. Built with TypeScript and Tailwind CSS, TravelMate is designed to showcase modern development techniques and serve as a reusable template for future projects.

## Table of Contents

- [Features](```Features```)
- [Tech Stack](```Tech-Stack```)
- [Project Structure](```Project-Structure```)
- [Development Setup](```Development-Setup```)
- [Docker Configuration](```Docker-Configuration```)
- [Testing and CI/CD](```Testing-and-CICD```)
- [Contributing](```Contributing```)
- [License](```License```)

## Features

- **User Authentication:** Login and registration pages.
- **Itinerary Management:** Create, view, update, and delete travel itineraries.
- **Destination Search & Interactive Maps:** Search for destinations and view them on an interactive map.
- **GraphQL API:** A robust backend API built with NestJS and Prisma for PostgreSQL.
- **Modern Frontend:** A Next.js application with Apollo Client for seamless GraphQL integration and Tailwind CSS for responsive design.
- **Dockerized Environment:** Everything is containerized using Docker and Docker Compose for consistent development and deployment.
- **Quality Assurance:** Pre-configured linting, commit hooks with Husky and lint-staged, and automated tests.

## Tech Stack

- **Backend:**
  - [NestJS](https://nestjs.com/)
  - [GraphQL](https://graphql.org/)
  - [Prisma](https://www.prisma.io/)
  - PostgreSQL
- **Frontend:**
  - [Next.js](https://nextjs.org/)
  - [Apollo Client](https://www.apollographql.com/docs/react/)
  - [Tailwind CSS](https://tailwindcss.com/)
- **DevOps & Tooling:**
  - Docker & Docker Compose
  - Yarn Workspaces
  - Husky, lint-staged, ESLint, Prettier
  - GitHub Actions for CI/CD

## Project Structure

```
travelmate/
├── LICENSE
├── README.md
├── docker-compose.yml
├── docker-compose.override.yml
├── packages/
│   ├── backend/         # NestJS backend with GraphQL and Prisma
│   │   ├── src/
│   │   │   ├── app.module.ts
│   │   │   ├── prisma/
│   │   │   ├── users/
│   │   │   ├── itineraries/
│   │   │   ├── destinations/
│   │   │   └── maps/
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── Dockerfile
│   │   └── package.json
│   └── frontend/        # Next.js frontend with Apollo Client and Tailwind CSS
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   └── auth/
│       │       ├── login/page.tsx
│       │       └── register/page.tsx
│       ├── lib/
│       │   └── apollo-client.ts
│       ├── components/
│       │   └── ApolloProviderWrapper.tsx
│       ├── public/
│       ├── tailwind.config.ts
│       ├── postcss.config.mjs
│       ├── tsconfig.json
│       ├── next.config.ts
│       └── package.json
└── .env.local          # Frontend environment variables
```

## Development Setup

1. **Clone the Repository:**

   ```
   git clone <repository-url>
   cd travelmate
   ```

2. **Install Dependencies:**

   At the root level, run:

   ```
   yarn install
   ```

3. **Environment Variables:**

   In ```packages/frontend/.env.local```, set the GraphQL endpoint:

   ```
   NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3001/graphql
   ```

   In ```packages/backend/.env```, configure your PostgreSQL connection if needed.

4. **Start the Containers:**

   Use Docker Compose for development. With the override file, run:

   ```
   docker-compose up --build
   ```

   - Frontend runs on [http://localhost:3000](http://localhost:3000)
   - Backend GraphQL API runs on [http://localhost:3001/graphql](http://localhost:3001/graphql)

## Docker Configuration

- **docker-compose.yml:**  
  Defines services for the PostgreSQL database, backend, and frontend.

- **docker-compose.override.yml:**  
  Adds volume mounts and development commands for live reloading.

- **Dockerfiles:**  
  Located in ```packages/backend``` and ```packages/frontend``` respectively, these files build the container images.

## Testing and CI/CD

- **Local Testing:**  
  Run tests for the frontend and backend using:

   ```
   yarn test
   ```

  or just one package with
  
  ```
  yarn workspace backend test
  ```

  and

  ```
  yarn workspace frontend test
  ```

- **CI/CD:**  
  GitHub Actions is configured to run linting, testing, and builds automatically on push and pull requests.

- **Commit Hooks:**  
  Husky and lint-staged are configured to enforce code quality before commits and pushes.

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style:**  
   Ensure your code adheres to our ESLint and Prettier configurations.

2. **Testing:**  
   Write unit and end-to-end tests for new features and bug fixes.

3. **Commit Messages:**  
   Write clear and descriptive commit messages.

4. **Pull Requests:**  
   Open a pull request describing your changes. Ensure all tests pass and CI checks are green.

## License

This project is licensed under the MIT License. See the ```LICENSE``` file for details.
