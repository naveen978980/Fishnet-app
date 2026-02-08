# Fishnet Backend API

A simple Express.js backend API for the Fishnet fishing app that stores catch data in a JSON file.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for fish catches
- ✅ JSON file storage (no database required)
- ✅ RESTful API endpoints
- ✅ CORS enabled for frontend integration
- ✅ Statistics endpoint for catch analytics

## Installation

```bash
cd backend
npm install
```

## Running the Server

### Production mode:
```bash
npm start
```

### Development mode (with auto-reload):
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /` - Check if API is running

### Catches
- `GET /api/catches` - Get all catches
- `GET /api/catches/:id` - Get a specific catch by ID
- `POST /api/catches` - Create a new catch record
- `PUT /api/catches/:id` - Update a catch record
- `DELETE /api/catches/:id` - Delete a catch record

### Statistics
- `GET /api/stats` - Get catch statistics

## Example Request

### Create a new catch:
```bash
POST http://localhost:3000/api/catches
Content-Type: application/json

{
  "fishType": "Bass",
  "weight": 2.5,
  "length": 15,
  "location": "Lake Michigan",
  "date": "2026-02-08",
  "time": "14:30",
  "notes": "Caught near the dock"
}
```

### Response:
```json
{
  "success": true,
  "message": "Catch recorded successfully",
  "data": {
    "id": "1707408600000",
    "fishType": "Bass",
    "weight": 2.5,
    "length": 15,
    "location": "Lake Michigan",
    "date": "2026-02-08",
    "time": "14:30",
    "notes": "Caught near the dock",
    "createdAt": "2026-02-08T14:30:00.000Z",
    "updatedAt": "2026-02-08T14:30:00.000Z"
  }
}
```

## Data Storage

All catch data is stored in `backend/data/catches.json`

## Configuration

Default port is 3000. You can change it by setting the PORT environment variable.
