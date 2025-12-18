```mermaid
classDiagram
    %% User class
    class User {
        - userId: String
        - name: String
        - email: String
        - passwordHash: String
        + login()
        + logout()
        + register()
    }

    %% Post class
    class Post {
        - postId: String
        - userId: String
        - title: String
        - description: String
        - location: String
        - rent: Number
        - genderPreference: String
        - petsAllowed: Boolean
        - createdAt: Date
        + createPost()
        + editPost()
        + deletePost()
        + viewPost()
    }

    %% Filter class
    class Filter {
        + applyFilters(location:String, rentRange:String, gender:String): List~Post~
    }

    %% Search class
    class Search {
        + searchPosts(keyword:String): List~Post~
    }

    %% AuthController
    class AuthController {
        + login(email:String, password:String): JWT
        + logout(token:String)
        + register(userData:Object)
    }

    %% PostController
    class PostController {
        + createPost(postData:Object)
        + editPost(postId:String, postData:Object)
        + deletePost(postId:String)
        + viewPost(postId:String)
        + filterPosts(filters:Object): List~Post~
        + searchPosts(keyword:String): List~Post~
    }

    %% Database
    class Database {
        + saveUser(user:User)
        + getUserByEmail(email:String)
        + savePost(post:Post)
        + getPostById(postId:String)
        + updatePost(post:Post)
        + deletePost(postId:String)
        + queryPosts(filters:Object): List~Post~
    }

    %% Relationships
    User "1" --> "*" Post : creates
    PostController --> Post : manages
    AuthController --> User : manages
    PostController --> Database : reads/writes
    AuthController --> Database : reads/writes
    Filter --> PostController : uses
    Search --> PostController : uses
