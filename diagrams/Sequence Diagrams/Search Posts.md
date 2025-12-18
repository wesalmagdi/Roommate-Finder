```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"
    participant BE as "Node.js API"
    participant DB as "MongoDB"

    User->>FE: Enter search keyword
    FE->>BE: GET /posts?search=keyword
    BE->>DB: Query posts by keyword

    alt Results found
        DB-->>BE: Matching posts
        BE-->>FE: Posts list
        FE-->>User: Display matching posts
    else No results
        DB-->>BE: Empty result
        BE-->>FE: Empty list
        FE-->>User: "No posts found"
    end
