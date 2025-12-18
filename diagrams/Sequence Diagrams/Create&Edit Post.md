```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Click "Create/Edit Post" and fill form
    FE->>BE: POST/PUT /posts

    alt User authorized
        BE->>BE: Verify JWT
        BE->>DB: Save/Update post
        DB-->>BE: Post saved/updated
        BE-->>FE: 200 OK
        FE-->>User: "Post created/edited successfully"
    else User not authorized
        BE-->>FE: 401 Unauthorized
        FE-->>User: "You must be logged in first"
        FE-->>User: Redirect to Login / Signup
    end
