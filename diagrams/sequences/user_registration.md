```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB

    User->>Frontend: Fill registration form (email, password, gender, university)
    Frontend->>Backend: POST /api/auth/signup { email, password, gender, university }
    Backend->>MongoDB: Create User document (hashed password)
    MongoDB-->>Backend: User created
    Backend-->>Frontend: 201 Created + JWT
    Frontend-->>User: Show success message + store JWT
