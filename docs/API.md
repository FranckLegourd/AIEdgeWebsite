# AI Edge International - API Documentation

This document provides detailed documentation for all API endpoints available in the AI Edge International application.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Production**: `https://your-domain.com/api`

## Authentication

The API uses session-based authentication with Passport.js. Include credentials with requests to maintain session state.

### Headers

```
Content-Type: application/json
```

---

## Authentication Endpoints

### Register User

Create a new user account.

**Endpoint:** `POST /api/register`

**Authentication:** Not required

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "company": "string | null"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Inc",
  "role": "client",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Username already exists |
| `400` | Validation error |

---

### Login

Authenticate a user and create a session.

**Endpoint:** `POST /api/login`

**Authentication:** Not required

**Request Body:**

```json
{
  "username": "string",
  "password": "string"
}
```

**Response:** `200 OK`

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Inc",
  "role": "client",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `401` | Invalid credentials |

---

### Logout

End the current user session.

**Endpoint:** `POST /api/logout`

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "message": "Logged out successfully"
}
```

---

### Get Current User

Retrieve the currently authenticated user.

**Endpoint:** `GET /api/user`

**Authentication:** Required

**Response:** `200 OK`

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Inc",
  "role": "client",
  "isActive": true,
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `401` | Not authenticated |

---

## Project Endpoints

### List Projects

Get all projects. Admin users see all projects; client users see only their assigned projects.

**Endpoint:** `GET /api/projects`

**Authentication:** Required

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "title": "AI Chatbot Implementation",
    "description": "Customer service chatbot with NLP capabilities",
    "status": "in_progress",
    "serviceType": "AI Agents",
    "clientId": 2,
    "assignedTo": 1,
    "budget": 50000,
    "startDate": "2024-01-01T00:00:00Z",
    "endDate": "2024-06-30T00:00:00Z",
    "createdAt": "2024-01-01T10:00:00Z",
    "updatedAt": "2024-01-15T14:30:00Z"
  }
]
```

---

### Get Project by ID

Retrieve a specific project by its ID.

**Endpoint:** `GET /api/projects/:id`

**Authentication:** Required

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Project ID |

**Response:** `200 OK`

```json
{
  "id": 1,
  "title": "AI Chatbot Implementation",
  "description": "Customer service chatbot with NLP capabilities",
  "status": "in_progress",
  "serviceType": "AI Agents",
  "clientId": 2,
  "assignedTo": 1,
  "budget": 50000,
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-06-30T00:00:00Z",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-15T14:30:00Z"
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `403` | Access denied (not your project) |
| `404` | Project not found |

---

### Create Project

Create a new project (Admin only).

**Endpoint:** `POST /api/projects`

**Authentication:** Required (Admin)

**Request Body:**

```json
{
  "title": "string",
  "description": "string",
  "status": "pending | in_progress | completed | on_hold",
  "serviceType": "string",
  "clientId": "integer",
  "assignedTo": "integer | null",
  "budget": "number | null",
  "startDate": "ISO date string | null",
  "endDate": "ISO date string | null"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "title": "New AI Project",
  "description": "Project description",
  "status": "pending",
  "serviceType": "Machine Learning",
  "clientId": 2,
  "assignedTo": null,
  "budget": null,
  "startDate": null,
  "endDate": null,
  "createdAt": "2024-01-15T10:00:00Z",
  "updatedAt": "2024-01-15T10:00:00Z"
}
```

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Validation error |
| `403` | Access denied (not admin) |

---

### Update Project

Update an existing project (Admin only).

**Endpoint:** `PATCH /api/projects/:id`

**Authentication:** Required (Admin)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Project ID |

**Request Body:** (all fields optional)

```json
{
  "title": "string",
  "description": "string",
  "status": "pending | in_progress | completed | on_hold",
  "serviceType": "string",
  "clientId": "integer",
  "assignedTo": "integer | null",
  "budget": "number | null",
  "startDate": "ISO date string | null",
  "endDate": "ISO date string | null"
}
```

**Response:** `200 OK`

Returns the updated project object.

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Validation error |
| `403` | Access denied (not admin) |
| `404` | Project not found |

---

### Delete Project

Delete a project (Admin only).

**Endpoint:** `DELETE /api/projects/:id`

**Authentication:** Required (Admin)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Project ID |

**Response:** `204 No Content`

**Error Responses:**

| Status | Description |
|--------|-------------|
| `403` | Access denied (not admin) |
| `404` | Project not found |

---

## Inquiry Endpoints

### List Inquiries

Get all contact form inquiries (Admin only).

**Endpoint:** `GET /api/inquiries`

**Authentication:** Required (Admin)

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@company.com",
    "company": "Tech Corp",
    "serviceInterest": "AI Automation",
    "message": "We're interested in automating our customer service.",
    "status": "new",
    "createdAt": "2024-01-15T09:00:00Z"
  }
]
```

---

### Create Inquiry

Submit a new contact form inquiry (public endpoint).

**Endpoint:** `POST /api/inquiries`

**Authentication:** Not required

**Request Body:**

```json
{
  "firstName": "string (required)",
  "lastName": "string (required)",
  "email": "string (required, valid email)",
  "company": "string (required)",
  "serviceInterest": "string (required)",
  "message": "string | null"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@company.com",
  "company": "Tech Corp",
  "serviceInterest": "AI Automation",
  "message": "We're interested in automating our customer service.",
  "status": "new",
  "createdAt": "2024-01-15T09:00:00Z"
}
```

**Side Effects:**

- Sends email notification to `agent@aiedgeinternational.com`

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Validation error |

---

### Update Inquiry

Update an inquiry status (Admin only).

**Endpoint:** `PATCH /api/inquiries/:id`

**Authentication:** Required (Admin)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | Inquiry ID |

**Request Body:** (all fields optional)

```json
{
  "status": "new | contacted | closed"
}
```

**Response:** `200 OK`

Returns the updated inquiry object.

**Error Responses:**

| Status | Description |
|--------|-------------|
| `400` | Validation error |
| `403` | Access denied (not admin) |
| `404` | Inquiry not found |

---

## User Endpoints

### List Users

Get all users (Admin only).

**Endpoint:** `GET /api/users`

**Authentication:** Required (Admin)

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "username": "admin",
    "email": "admin@aiedge.com",
    "firstName": "Admin",
    "lastName": "User",
    "company": "AI Edge International",
    "role": "admin",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

> **Note:** Password field is excluded from the response.

---

### Update User

Update user information (Admin only).

**Endpoint:** `PATCH /api/users/:id`

**Authentication:** Required (Admin)

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | User ID |

**Request Body:** (all fields optional)

```json
{
  "email": "string",
  "firstName": "string",
  "lastName": "string",
  "company": "string | null",
  "role": "client | admin",
  "isActive": "boolean"
}
```

> **Note:** Password cannot be updated through this endpoint.

**Response:** `200 OK`

Returns the updated user object (without password).

**Error Responses:**

| Status | Description |
|--------|-------------|
| `403` | Access denied (not admin) |
| `404` | User not found |

---

## Error Response Format

All error responses follow this format:

```json
{
  "message": "Error description",
  "errors": [
    {
      "code": "error_code",
      "message": "Detailed error message",
      "path": ["field", "path"]
    }
  ]
}
```

The `errors` array is only present for validation errors.

---

## Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No Content (successful deletion) |
| `400` | Bad Request (validation error) |
| `401` | Unauthorized (not authenticated) |
| `403` | Forbidden (insufficient permissions) |
| `404` | Not Found |
| `500` | Internal Server Error |

---

## Rate Limiting

Currently, the API does not implement rate limiting. For production deployments, consider adding rate limiting middleware.

---

## CORS

In development mode, CORS is handled by the Vite dev server proxy. In production, the frontend is served from the same origin as the API.

---

## Example Usage

### cURL Examples

**Login:**
```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "password123"}' \
  -c cookies.txt
```

**Get Projects (with session):**
```bash
curl http://localhost:3000/api/projects \
  -b cookies.txt
```

**Create Inquiry:**
```bash
curl -X POST http://localhost:3000/api/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "company": "Acme Inc",
    "serviceInterest": "AI Automation",
    "message": "Interested in your services"
  }'
```

### JavaScript/TypeScript Examples

```typescript
// Using fetch API
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({
    username: 'admin',
    password: 'password123'
  })
});

const user = await response.json();
```

```typescript
// Using TanStack Query (as used in the application)
import { useQuery } from '@tanstack/react-query';

const { data: projects } = useQuery({
  queryKey: ['projects'],
  queryFn: async () => {
    const res = await fetch('/api/projects', {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  }
});
```

---

## Webhooks

The application currently does not support webhooks. Email notifications are sent when new inquiries are created.

---

## Versioning

The API is currently at version 1.0. There is no versioning in the URL path. Breaking changes will be communicated in advance.
