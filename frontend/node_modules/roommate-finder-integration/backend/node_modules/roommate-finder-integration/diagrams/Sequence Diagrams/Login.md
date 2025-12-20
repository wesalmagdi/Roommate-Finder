```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Enter email & password
    FE->>BE: POST /login
    BE->>DB: Find user by email

    alt Credentials valid
        DB-->>BE: User record
        BE->>BE: Verify password
        BE->>BE: Generate JWT token
        BE-->>FE: Login success + JWT
        FE-->>User: Access granted
    else Credentials invalid / user not found
        DB-->>BE: User not found / password mismatch
        BE-->>FE: 401 Unauthorized
        FE-->>User: "Invalid email or password"
    end
