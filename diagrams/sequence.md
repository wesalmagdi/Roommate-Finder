sequenceDiagram
    participant User
    participant Frontend as Frontend (React)
    participant Backend as Backend (Node.js API)
    participant DB as MongoDB

    User->>Frontend: Open "Find Roommates" page
    Frontend->>Backend: GET /posts?filters
    Backend->>DB: Query posts with filters
    DB-->>Backend: Return filtered posts
    Backend-->>Frontend: Send posts JSON
    Frontend-->>User: Display filtered roommate posts


    User->>Frontend: Submit new Post
    Frontend->>Backend: POST /posts (body: postData)
    Backend->>DB: Insert new post
    DB-->>Backend: Confirm insertion
    Backend-->>Frontend: Post created (201)
    Frontend-->>User: Show success message


    User->>Frontend: Register account
    Frontend->>Backend: POST /auth/register
    Backend->>DB: Create user in database
    DB-->>Backend: User document stored
    Backend-->>Frontend: Registration success
    Frontend-->>User: Redirect to Login
