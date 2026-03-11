# Type-Safe Express Blog API

A **production-style REST API** for managing blog posts and authors built with **Node.js, Express, and TypeScript**.
This project demonstrates **type-safe backend development**, **clean architecture**, **API validation**, and **containerized deployment using Docker**.

The application exposes a set of REST endpoints to create, retrieve, update, and delete blog posts while ensuring **strong type safety**, **structured responses**, and **reliable database persistence**.

---

# Table of Contents

1. Project Overview
2. Architecture
3. Technology Stack
4. Key Features
5. Project Structure
6. Environment Configuration
7. Running the Application
8. Docker Deployment
9. Database Design
10. Database Seeding
11. API Design
12. API Endpoints
13. Response Format
14. Type-Safe API Client
15. Development Guidelines
16. Testing the API
17. Production Considerations

---

# 1. Project Overview

The **Type-Safe Express Blog API** is designed to demonstrate best practices for modern backend development. The project focuses on:

* Type safety with TypeScript
* Structured API responses
* Data validation using Zod
* Clean separation of concerns
* Containerized deployment with Docker
* Persistent SQLite database storage
* Pagination and filtering capabilities

The API supports full **CRUD operations** on blog posts while maintaining relationships between **authors and posts**.

---

# 2. Architecture

The project follows a **layered architecture**:

```
Controller Layer
      ↓
Service Layer
      ↓
Repository Layer
      ↓
Database Layer
```

### Controller

Handles HTTP requests and responses.

### Service

Contains business logic.

### Repository

Handles database interactions.

### Database

SQLite database accessed through `better-sqlite3`.

This architecture ensures the system remains **modular, testable, and maintainable**.

---

# 3. Technology Stack

| Technology     | Purpose               |
| -------------- | --------------------- |
| Node.js        | Runtime environment   |
| Express        | Web framework         |
| TypeScript     | Type safety           |
| Zod            | Request validation    |
| SQLite         | Lightweight database  |
| better-sqlite3 | SQLite driver         |
| Docker         | Containerization      |
| Docker Compose | Service orchestration |

---

# 4. Key Features

* Fully **containerized application**
* **Type-safe API contracts**
* **Zod validation** for request data
* **Consistent response format**
* **Pagination support**
* **Filtering by author**
* **Health monitoring endpoint**
* **Database auto-seeding**
* **Persistent database storage**
* **Manual type-safe API client**

---

# 5. Project Structure

```
.
├── src
│   ├── controllers
│   │   └── posts.controller.ts
│   ├── services
│   │   └── posts.service.ts
│   ├── repositories
│   │   └── posts.repository.ts
│   ├── routes
│   │   └── posts.routes.ts
│   ├── middleware
│   │   └── errorHandler.ts
│   ├── utils
│   │   └── database.ts
│   ├── db
│   │   └── seed.ts
│   ├── client.ts
│   └── index.ts
│
├── Dockerfile
├── docker-compose.yml
├── tsconfig.json
├── package.json
├── .env.example
├── README.md
└── data
```

---

# 6. Environment Configuration

The application requires environment variables to run.
These variables are documented in the `.env.example` file.

Example:

```
PORT=3000
DATABASE_PATH=/usr/src/app/data/blog.db
```

### Description

| Variable      | Description                      |
| ------------- | -------------------------------- |
| PORT          | Port used by Express server      |
| DATABASE_PATH | Location of SQLite database file |

---

# 7. Running the Application

## Install Dependencies

```
npm install
```

## Run Development Server

```
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

# 8. Docker Deployment

The application is fully containerized.

### Build and Run

```
docker-compose up -d --build
```

### Stop Containers

```
docker-compose down
```

### Verify Running Containers

```
docker ps
```

The SQLite database will persist in:

```
./data/blog.db
```

---

# 9. Database Design

The system uses a relational schema with two tables.

## Authors Table

| Column | Type    | Constraints               |
| ------ | ------- | ------------------------- |
| id     | INTEGER | PRIMARY KEY AUTOINCREMENT |
| name   | TEXT    | NOT NULL                  |
| email  | TEXT    | UNIQUE, NOT NULL          |

## Posts Table

| Column    | Type    | Constraints               |
| --------- | ------- | ------------------------- |
| id        | INTEGER | PRIMARY KEY AUTOINCREMENT |
| title     | TEXT    | NOT NULL                  |
| content   | TEXT    | NOT NULL                  |
| authorId  | INTEGER | FOREIGN KEY               |
| createdAt | TEXT    | DEFAULT datetime('now')   |
| updatedAt | TEXT    | DEFAULT datetime('now')   |

The `authorId` column establishes a **relationship between posts and authors**.

---

# 10. Database Seeding

On the **first startup**, the system automatically inserts sample data:

* 1 author
* 5 posts

The seeding process is **idempotent**, meaning repeated startups will not create duplicate data.

---

# 11. API Design

The API follows RESTful conventions and includes:

* Resource-based endpoints
* JSON responses
* Standard HTTP status codes
* Consistent response structure
* Validation using Zod

---

# 12. API Endpoints

## Health Check

```
GET /api/health
```

Response:

```
{
  "status": "ok",
  "timestamp": "2026-03-11T10:00:00.000Z"
}
```

---

## Create Post

```
POST /api/posts
```

Body:

```
{
  "title": "My First Post",
  "content": "This is a blog post content.",
  "authorId": 1
}
```

---

## Get Posts

```
GET /api/posts
```

Query Parameters:

| Parameter | Description      |
| --------- | ---------------- |
| page      | Page number      |
| limit     | Results per page |
| authorId  | Filter by author |

Example:

```
/api/posts?page=1&limit=10
```

---

## Get Single Post

```
GET /api/posts/:id
```

Example:

```
/api/posts/1
```

---

## Update Post

```
PATCH /api/posts/:id
```

Body:

```
{
  "title": "Updated title"
}
```

---

## Delete Post

```
DELETE /api/posts/:id
```

Response:

```
{
  "success": true,
  "data": {
    "message": "Post deleted successfully."
  }
}
```

---

# 13. API Response Format

All responses follow a standardized structure.

### Success

```
{
  "success": true,
  "data": {}
}
```

### Error

```
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Description"
  }
}
```

This format ensures **consistent API responses for clients**.

---

# 14. Type-Safe API Client

A manually written client is included:

```
src/client.ts
```

Example usage:

```ts
const client = new BlogApiClient("http://localhost:3000")

await client.getPosts()

await client.createPost({
  title: "New Post",
  content: "Hello world content",
  authorId: 1
})
```

The client uses the **same TypeScript DTO types** as the server.

---

# 15. Development Guidelines

The codebase follows strict TypeScript rules:

* `strict` mode enabled
* `noImplicitAny` enabled
* No use of `any`
* No `@ts-ignore`
* Strong type contracts between layers

Compile check:

```
npx tsc --noEmit
```

---

# 16. Testing the API

You can test the API using:

* Postman
* Thunder Client
* curl

Example:

```
curl http://localhost:3000/api/posts
```

---

# 17. Production Considerations

In a production environment the following improvements are recommended:

* Authentication and authorization
* Rate limiting
* Logging and monitoring
* API versioning
* CI/CD pipeline
* Automated testing
* Production database (PostgreSQL)

---

# Conclusion

This project demonstrates how to build a **clean, type-safe backend API using modern Node.js tools** while ensuring maintainability, reliability, and scalability.

It highlights:

* Strong type safety
* Docker-based deployment
* Structured architecture
* Robust API design

