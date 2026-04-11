# Task Manager Full Stack Assignment

This project is a small full-stack Task Manager app built to match the assignment scope and keep the backend code flow close to the layered style used in the referenced Flight Search Service repository.

## Tech Stack

- Backend: Node.js, Express
- Frontend: React (Vite) + Tailwind CSS
- Storage: JSON file (`backend/src/data/tasks.json`)

## Features

- List all tasks
- Create a task
- Mark task complete/incomplete
- Filter tasks (all, pending, completed)
- Edit task title
- Delete a task
- Persist tasks after refresh/restart (file-based)
- Loading and error states in frontend
- Basic request validation in backend
- Clear JSON response structure

## Backend Architecture (code flow)

- routes -> controllers -> services -> repository -> data store
- middlewares for validation
- common response/error utility classes

## API Endpoints

- `GET /tasks` -> return all tasks (supports `?status=all|pending|completed`)
- `POST /tasks` -> create task
- `PATCH /tasks/:id` -> update task title and/or completed status
- `DELETE /tasks/:id` -> delete task

Also available as versioned routes:

- `GET /api/v1/tasks`
- `POST /api/v1/tasks`
- `PATCH /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

## Task Model

```json
{
  "id": "1",
  "title": "Finish assignment",
  "completed": false,
  "createdAt": "2026-04-10T12:00:00.000Z"
}
```

## Setup

Start the backend first, then open a second terminal for the frontend.

1. Start backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs at `http://localhost:3000`.

2. Start frontend in a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and proxies API requests to backend.

3. Optional production frontend build:

```bash
cd frontend
npm run build
```

After build, backend can serve frontend from `frontend/dist` on `http://localhost:3000`.

## Assumptions and Trade-offs

- Kept persistence file-based (JSON) to avoid database setup and keep the assignment lightweight.
- File-based storage is simple but not ideal for concurrent production workloads.
- Added both root and versioned API routes to match the assignment contract while preserving a structured route layout.
- Kept the frontend intentionally minimal and functional so the focus stays on correctness and task flow.

Short note: This solution favors simplicity and clarity over production-scale infrastructure. I used JSON-file persistence and a lean UI to keep the feature set easy to understand, quick to run, and aligned with a small assignment scope.

## Optional Bonus Status

- Filter tasks: implemented
- Edit title: implemented
- Persist after refresh: implemented (JSON file storage)
- Tests: not implemented
- Docker: not implemented

## Submission Checklist

- Includes setup and run instructions in this README.
- Includes a short assumptions and trade-offs note in this README.
- Interface is intentionally simple; focus is on functionality, structure, and correctness.

## 2-Minute Demo Flow

1. Start backend:

```bash
cd backend
npm install
npm run dev
```

2. Start frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

3. Open the app at `http://localhost:5173`.
4. Add two tasks.
5. Mark one task as complete.
6. Use filters: `All`, `Pending`, `Completed`.
7. Edit a task title and save.
8. Delete one task.
9. Refresh the page and verify tasks persist.
# task-manager-assignment
