```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Enter email & password
    FE->>BE: POST /login
    BE->>DB: Find user by email
    DB-->>BE: User record
    BE->>BE: Verify password
    BE->>BE: Generate JWT token
    BE-->>FE: Login success + JWT
    FE-->>User: Access granted
