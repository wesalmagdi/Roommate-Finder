```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Edit/Delete post
    FE->>BE: PUT/DELETE /posts/{id}

    alt User is post owner
        BE->>BE: Verify JWT
        BE->>DB: Check post ownership
        DB-->>BE: Ownership confirmed
        BE->>DB: Update/Delete post
        DB-->>BE: Post updated/deleted
        BE-->>FE: Success
        FE-->>User: Action completed
    else User not post owner
        BE-->>FE: 403 Forbidden
        FE-->>User: "You are not allowed to modify this post"
    end
