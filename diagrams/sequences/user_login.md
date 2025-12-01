```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB

    User->>Frontend: Fill login form (email, password)
    Frontend->>Backend: POST /api/auth/login { email, password }
    Backend->>MongoDB: Find User by email
    MongoDB-->>Backend: Return User document
    Backend->>Backend: Compare password with hashed password
    Backend-->>Frontend: Return JWT
    Frontend-->>User: Store JWT + update state
