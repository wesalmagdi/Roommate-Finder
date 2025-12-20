```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Select filter criteria
    FE->>BE: GET /posts?filters
    BE->>DB: Query posts with filters

    alt Matching posts found
        DB-->>BE: Filtered posts
        BE-->>FE: Posts list
        FE-->>User: Display filtered posts
    else No matching posts
        DB-->>BE: Empty result
        BE-->>FE: Empty list
        FE-->>User: "No posts found"
    end
