# Casino Jackpot Assignment

## Technology Stack

- **Backend:** NestJS (TypeScript), Prisma ORM, PostgreSQL
- **Frontend:** React (TypeScript), Vite, TailwindCSS, Axios
- **Testing:** Jest, Supertest, ts-jest
- **Linting & Formatting:** ESLint, Prettier
- **Containerization:** Docker, Docker Compose
- **Static Assets (Prod):** Nginx (serves built frontend)

## Design Decisions

- **Modular Architecture:** Backend is organized by feature modules (slot machine, credits, cashout, etc.) for scalability and maintainability.
- **Session Management:** Custom middleware for IP-based session tracking, with session data stored in PostgreSQL.
- **Type Safety:** Strict DTOs and types throughout backend and frontend for robust API contracts.
- **Prisma ORM:** Used for database migrations, type-safe queries, and client generation. Binary targets configured for cross-platform compatibility.
- **Hot Reload (Dev):** Backend uses ts-node-dev for live reload; frontend uses Vite dev server.
- **Production Builds:** Multi-stage Dockerfiles for both backend and frontend, minimizing image size and attack surface.
- **Testing:** Unit and integration tests for backend, with test database isolated via Docker Compose.
- **Frontend API:** All API calls use Axios, with environment-based configuration for backend URL.

## Developer Experience (DX)

- **Linting:** ESLint and Prettier are enforced for both backend and frontend. Config files are excluded from Docker images for clean builds.
- **Git Hooks:** Husky is configured to run linting and formatting checks pre-commit, ensuring code quality and consistency.
- **Path Aliases:** TypeScript path aliases (`@src/`, etc.) for cleaner imports and easier refactoring.
- **Environment Variables:** `.env.default` and `.env.test` files for environment-specific configuration; excluded from images via `.dockerignore`.
- **Docker Compose:** One command to spin up full dev environment (backend, frontend, databases) with hot reload and isolated volumes.

---

For boot, please see `README.boot.md`.
