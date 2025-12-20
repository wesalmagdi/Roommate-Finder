```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Enter registration data
    FE->>BE: POST /register
    BE->>BE: Validate input

    alt Valid registration
        BE->>BE: Hash password
        BE->>DB: Save new user
        DB-->>BE: User saved
        BE-->>FE: Registration success
        FE-->>User: Confirmation message
    else Email already exists / invalid input
        BE-->>FE: 409 Conflict / 400 Bad Request
        FE-->>User: Show error message
    end
