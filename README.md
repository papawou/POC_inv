# Project Setup

## Run the Project

To build and run the entire project:

```bash
make all
```

## Development Environment

### Frontend Development

To start the frontend development server:

```bash
make frontend_dev
```

Access the frontend at: [http://localhost:5173](http://localhost:5173)

### Backend Development

To start the backend development server:

```bash
make backend_dev
```

## Create an Account

You can create a test account by running the following command:

```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

This will create a user with the email `test@example.com` and password `password123`.
