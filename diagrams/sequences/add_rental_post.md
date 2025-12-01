```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant MongoDB

    User->>Frontend: Open AddPostForm
    Frontend->>User: Fill post details
    Frontend->>Backend: POST /api/posts with JWT
    Backend->>MongoDB: Create Post document
    MongoDB-->>Backend: Post created
    Backend-->>Frontend: Return created post
    Frontend-->>User: Update posts state + display PostCard
