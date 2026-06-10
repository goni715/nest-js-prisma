<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# NestJS + Prisma REST API Starter

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/goni715/nest-js-prisma)

A progressive, production-ready [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) REST API boilerplate utilizing a server-less PostgreSQL database (via Supabase) with connection pooling, structured validation pipes, and custom global exception filters.

---

## 🚀 Key Features

- **NestJS Framework**: Modular, clean architecture with TypeScript.
- **Prisma ORM integration**: Type-safe database queries, custom schemas, and database migrations.
- **PostgreSQL Connection Pooling**: Configured using `@prisma/adapter-pg` to support both transaction pooler (`DATABASE_URL` with PgBouncer) and direct connection (`DIRECT_URL`) setups.
- **Custom Global Validation**: Integrated `ValidationPipe` that parses errors into custom client-friendly structures mapping fields directly to error details.
- **Global Error Interception**: Centralized `HttpExceptionFilter` handling route fallback issues (`404 Route Not Found`), database client conflicts (`409 Conflict`), and standard error structures.
- **Structured DTOs**: Utilizing `class-validator` and `class-transformer` for reliable API data parsing and validation.

---

## 🛠️ Tech Stack

- **Framework:** NestJS (v11.x)
- **Database ORM:** Prisma Client (v7.8.0)
- **Database Driver:** `@prisma/adapter-pg` (Postgres adapter for Node-postgres)
- **Validation:** `class-validator` & `class-transformer`
- **Language:** TypeScript & ES2023
- **Linter & Formatter:** ESLint (v9.x Flat Config) & Prettier

---

## 📂 Project Structure

Below is the directory structure outlining the modules, configuration files, and configuration flows:

```
nest-js-prisma/
├── prisma/
│   ├── migrations/          # PostgreSQL database migration history
│   └── schema.prisma        # Prisma schema definitions & data models
├── src/
│   ├── filters/             # Custom exception filters
│   │   └── http-exception/
│   │       └── http-exception.filter.ts # Global Exception Filter mapping error outputs
│   ├── generated/           # Target output for Prisma generated client
│   ├── modules/             # Feature modules (Domain-driven logic)
│   │   └── user/            # User CRUD Feature Module
│   │       ├── dto/         # Request validation Data Transfer Objects
│   │       │   ├── create-user.dto.ts
│   │       │   ├── update-user.dto.ts
│   │       │   └── user-params.dto.ts
│   │       ├── user.controller.ts # Entry endpoints mapping request payloads
│   │       ├── user.module.ts     # Scopes and dependency resolutions
│   │       └── user.service.ts    # Application logic & database manipulation
│   ├── prisma/              # Prisma integration components
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts # Instantiates PrismaClient with custom adapters
│   ├── app.controller.ts    # Root controller
│   ├── app.module.ts        # Main root application module
│   ├── app.service.ts       # Root service (Welcome endpoint)
│   └── main.ts              # Entrypoint bootstrapping the NestJS application
├── .env                     # Configuration file for environment variables (ignored by Git)
├── eslint.config.mjs        # Flat ESLint rules configuration
├── nest-cli.json            # NestJS CLI configuration
├── package.json             # Dependencies, devDependencies, and run scripts
├── prisma.config.ts         # Prisma environment and migration setup configurations
└── tsconfig.json            # Compiler configurations
```

---

## ⚙️ Setup & Installation

### 1. Clone the repository and install dependencies
```bash
# Install dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root of the project and populate it with your database connection strings:

```env
# Connect to Postgres via the connection pooler (e.g. Supabase pooler on port 6543)
DATABASE_URL="postgresql://<user>:<password>@<host>:6543/<db_name>?pgbouncer=true"

# Connect to Postgres directly (used for migrations and schema pushes on port 5432)
DIRECT_URL="postgresql://<user>:<password>@<host>:5432/<db_name>"

# Application execution port (Default: 3000)
PORT=3000
```

### 3. Generate Prisma Client
Since the project uses a custom output path for client generation (`src/generated/prisma`), compile the Prisma Client files by running:
```bash
npx prisma generate
```

### 4. Apply Database Migrations
Synchronize your local schema definitions with your database:
```bash
npx prisma migrate dev --name init
```

---

## 🏃 Running the Application

Choose one of the following commands depending on your environment:

```bash
# Start in development watch mode (recompiles on save)
npm run start:dev

# Start in standard development mode
npm run start

# Start in debug mode
npm run start:debug

# Build the project for production
npm run build

# Start the production build
npm run start:prod
```

---

## 🧪 Running Tests

```bash
# Unit tests
npm run test

# Watch mode unit tests
npm run test:watch

# End-to-end (E2E) tests
npm run test:e2e

# Test coverage report
npm run test:cov
```

---

## 📡 API Endpoints Documentation

The base API prefix is configured as: `/api/v1`

### 1. Root Handlers
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Returns application welcome message. |

**Sample Response (`GET /`):**
```text
Hello World!
```

---

### 2. User Module (`/api/v1/user`)
All CRUD operations related to users.

#### 👥 Create User
- **Endpoint:** `POST /api/v1/user`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User is created successfully",
    "data": {
      "id": 1,
      "email": "jane.doe@example.com",
      "name": "Jane Doe"
    }
  }
  ```

#### 👥 Get All Users
- **Endpoint:** `GET /api/v1/user/all`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Users are retrieved successfully",
    "data": [
      {
        "id": 1,
        "email": "jane.doe@example.com",
        "name": "Jane Doe"
      }
    ]
  }
  ```

#### 👥 Get User By ID
- **Endpoint:** `GET /api/v1/user/:id`
- **Path Parameter:** `id` (must be an integer)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User is retrieved successfully",
    "data": {
      "id": 1,
      "email": "jane.doe@example.com",
      "name": "Jane Doe"
    }
  }
  ```

#### 👥 Update User
- **Endpoint:** `PATCH /api/v1/user/:id`
- **Path Parameter:** `id` (must be an integer)
- **Request Body (All fields optional):**
  ```json
  {
    "name": "Jane Smith",
    "email": "janesmith@example.com"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User is updated successfully",
    "data": {
      "id": 1,
      "email": "janesmith@example.com",
      "name": "Jane Smith"
    }
  }
  ```

#### 👥 Delete User
- **Endpoint:** `DELETE /api/v1/user/:id`
- **Path Parameter:** `id` (must be an integer)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User is deleted successfully",
    "data": {
      "id": 1,
      "email": "janesmith@example.com",
      "name": "Jane Smith"
    }
  }
  ```

---

## 📋 Data Transfer Objects (DTOs)

The project leverages Data Transfer Objects (DTOs) for incoming request validation and payload transformation. They are defined in the `src/modules/user/dto` directory:

### 1. [CreateUserDto](file:///f:/my-projects/Nest-js-Tutorial/nest-js-prisma/src/modules/user/dto/create-user.dto.ts)
Used to validate payload when creating a new user (`POST /api/v1/user`).

| Field | Types | Validation Rules | Custom Error Message |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `@IsString()`, `@IsNotEmpty()` | `"Name must be string"`, `"Name is required"` |
| `email` | `string` | `@IsNotEmpty()`, `@IsEmail()` | `"email is required"`, `"email is not valid"` |

```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'Name is required' })
  name!: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'email is not valid' })
  email!: string;
}
```

### 2. [UpdateUserDto](file:///f:/my-projects/Nest-js-Tutorial/nest-js-prisma/src/modules/user/dto/update-user.dto.ts)
Used to validate payload when updating an existing user (`PATCH /api/v1/user/:id`).

| Field | Types | Validation Rules | Custom Error Message |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `@IsOptional()`, `@IsString()` | `"Name must be string"` |
| `email` | `string` | `@IsOptional()`, `@IsEmail()` | `"email is not valid"` |

```typescript
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Name must be string' })
  name!: string;

  @IsOptional()
  @IsEmail({}, { message: 'email is not valid' })
  email!: string;
}
```

### 3. [UserParamsDto](file:///f:/my-projects/Nest-js-Tutorial/nest-js-prisma/src/modules/user/dto/user-params.dto.ts)
Used to validate and auto-coerce URL route parameters (e.g. `id` in `GET/PATCH/DELETE /api/v1/user/:id`).

| Field | Types | Validation Rules | Purpose / Conversion |
| :--- | :--- | :--- | :--- |
| `id` | `number` | `@Type(() => Number)`, `@IsInt()` | Explicitly converts incoming string parameter to a validated integer |

```typescript
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UserParamsDto {
  @Type(() => Number)
  @IsInt()
  id!: number;
}
```

---

## 🛡️ Error & Validation Design

The application ensures structured, easy-to-parse error payloads for frontend developers.

### Validation Errors (400 Bad Request)
When input validation fails on properties in request payloads (e.g. invalid email or missing name), the custom `ValidationPipe` maps all class-validator constraints and returns:

```json
{
  "success": false,
  "message": "email is not valid",
  "error": {
    "name": "Name is required",
    "email": "email is not valid"
  }
}
```

### Route Not Found Errors (404 Not Found)
Trying to access unregistered routes generates:

```json
{
  "success": false,
  "message": "Route Not Found",
  "error": {
    "path": "/api/v1/user/invalid-endpoint",
    "method": "GET"
  }
}
```

### Business Logic Exceptions
- **409 Conflict** (e.g., creating a user with an email that already exists):
  ```json
  {
    "statusCode": 409,
    "message": "Email already exists",
    "error": "Conflict"
  }
  ```
- **404 Not Found** (e.g., retrieving a user that does not exist in the database):
  ```json
  {
    "statusCode": 404,
    "message": "User not found",
    "error": "Not Found"
  }
  ```
