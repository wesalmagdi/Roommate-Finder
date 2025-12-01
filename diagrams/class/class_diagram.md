```mermaid
classDiagram
    class User {
        +String _id
        +String name
        +String email
        +String password
        +String gender
        +String university
        +Date createdAt
        +Date updatedAt
        +signup()
        +login()
    }

    class Post {
        +String _id
        +String title
        +String description
        +String city
        +String address
        +Number price
        +Boolean furnished
        +Boolean smokingAllowed
        +String gender
        +Array amenities
        +Array images
        +String contact_Email
        +String contact_Phone
        +ObjectId createdBy
        +Date createdAt
        +Date updatedAt
        +createPost()
        +editPost()
        +deletePost()
        +getPostById()
    }

    class JWT {
        +generateToken(userId)
        +verifyToken(token)
    }

    User "1" --> "*" Post : creates
    Post --> User : createdBy
