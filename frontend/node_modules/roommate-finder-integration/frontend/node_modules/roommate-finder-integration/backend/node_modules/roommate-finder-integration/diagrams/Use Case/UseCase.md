```mermaid
flowchart LR
    %% Actors
    Guest[Guest]
    User[Registered User]

    %% Use Cases
    Register["Register"]
    Login["Login"]
    Logout["Logout"]
    CreatePost["Create Post"]
    EditPost["Edit Post"]
    DeletePost["Delete Post"]
    ViewPosts["View Posts"]
    SearchPosts["Search Posts"]
    FilterPosts["Filter Posts"]
    Unauthorized["Unauthorized Access"]

    %% Guest actions
    Guest --> Register
    Guest --> Login
    Guest --> ViewPosts
    Guest --> SearchPosts
    Guest --> FilterPosts

    %% Registered User actions
    User --> CreatePost
    User --> EditPost
    User --> DeletePost
    User --> Logout
    User --> ViewPosts
    User --> SearchPosts
    User --> FilterPosts

    %% Includes (mandatory steps)
    CreatePost ---|includes| Login
    EditPost ---|includes| Login
    DeletePost ---|includes| Login

    %% Extends (alternative flows)
    CreatePost ---|extends| Unauthorized
    EditPost ---|extends| Unauthorized
    DeletePost ---|extends| Unauthorized
    ViewPosts ---|extends| SearchPosts
    ViewPosts ---|extends| FilterPosts
