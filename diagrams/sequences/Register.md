# Register Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Enter registration data
    FE->>BE: POST /register
    BE->>BE: Validate input
    BE->>BE: Hash password
    BE->>DB: Save new user
    DB-->>BE: User saved
    BE-->>FE: Registration success
    FE-->>User: Confirmation message
