
# School Management Assignment

This project implements a set of RESTful APIs using Node.js, Express.js, and MySQL to manage school data. Users can add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

## Folder Structure

```
school-management-assignment/
├── README.md
└── server/
 ├── .env
 ├── .gitignore
 ├── package.json
 ├── package-lock.json
 ├── server.js
 ├── config/
 │   └── db.js
 ├── controllers/
 │   └── schoolController.js
 ├── middleware/
 │   └── globalErrorHandler.js
 ├── models/
 │   └── schoolModel.js
 ├── routes/
 │   └── schoolRoutes.js
 └── utils/
  ├── appError.js
  ├── catchAsync.js
  └── distanceCalculator.js
```

## Database Setup

Create a MySQL table named `schools`:

```sql
CREATE TABLE schools (
 id INT AUTO_INCREMENT PRIMARY KEY,
 school_name VARCHAR(255) NOT NULL,
 school_address VARCHAR(255) NOT NULL,
 latitude FLOAT NOT NULL,
 longitude FLOAT NOT NULL
);
```

## Environment Variables

Create a `.env` file in the `server` folder with your database credentials:

```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=school_management
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
```

## Installation & Running

1. Install dependencies:

  ```
  npm install
  ```

2. Start the server:

  ```
  npm start
  ```

## API Endpoints

### Add School

- **Endpoint:** `POST /api/v1/schools/addSchool`
- **Payload:**

 ```json
 {
  "school_name": "St. Xavier's School",
  "school_address": "Park Street, Kolkata",
  "latitude": 22.5522,
  "longitude": 88.3634
 }
 ```

- **Response:**

 ```json
 {
  "status": "success",
  "message": "School added successfully",
  "schoolId": 1
 }
 ```

### List Schools (Sorted by Proximity)

- **Endpoint:** `GET /api/v1/schools/listSchools?latitude=22.5522&longitude=88.3634`
- **Response:**

 ```json
 {
  "status": "success",
  "results": 4,
  "data": [
   {
    "id": 1,
    "school_name": "St. Xavier's School",
    "school_address": "Park Street, Kolkata",
    "latitude": 22.5522,
    "longitude": 88.3634,
    "distance": 0
   },
  ]
 }
 ```

## Postman Collection

You can import the following example requests into Postman:

**Add School:**

```
POST http://localhost:3000/api/v1/schools/addSchool
Body (JSON):
{
 "school_name": "Delhi Public School",
 "school_address": "Mathura Road, New Delhi",
 "latitude": 28.5672,
 "longitude": 77.2514
}
```

**List Schools:**

```
GET http://localhost:3000/api/v1/schools/listSchools?latitude=22.5522&longitude=88.3634
```

## Notes

- All code is written in JavaScript (Node.js/Express).
- No JWT, authentication, or MongoDB logic is present.
- Only required dependencies are installed.
- Security and error handling are implemented for assignment scope.

