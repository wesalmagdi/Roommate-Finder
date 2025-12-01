```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB

    User->>Frontend: Fill search filters (city, budget, gender)
    Frontend->>Backend: GET /api/posts/search?city=...&budget=...&gender=...
    Backend->>MongoDB: Filter Posts
    MongoDB-->>Backend: Return filtered posts
    Backend-->>Frontend: Return filtered posts
    Frontend-->>User: Update displayed posts
