```mermaid
%% Use Case Diagram in Mermaid
%% Actors: Guest, Registered User
%% Use Cases: Register, Login, Logout, Create/Edit Post, Edit/Delete Post, Filter, Search
%% Includes / Extends show alternative and required flows

%% Actors
actor Guest
actor "Registered User" as User

%% Use Cases
usecase Register as UC_Register
usecase Login as UC_Login
usecase Logout as UC_Logout
usecase "Create Post" as UC_CreatePost
usecase "Edit Post" as UC_EditPost
usecase "Delete Post" as UC_DeletePost
usecase "View Posts" as UC_ViewPosts
usecase "Search Posts" as UC_SearchPosts
usecase "Filter Posts" as UC_FilterPosts
usecase "Unauthorized Access" as UC_Unauthorized

%% Guest actions
Guest --> UC_Register
Guest --> UC_Login
Guest --> UC_ViewPosts
Guest --> UC_SearchPosts
Guest --> UC_FilterPosts

%% Registered User actions
User --> UC_CreatePost
User --> UC_EditPost
User --> UC_DeletePost
User --> UC_Logout
User --> UC_ViewPosts
User --> UC_SearchPosts
User --> UC_FilterPosts

%% Includes (mandatory steps)
UC_CreatePost ..> UC_Login : <<includes>>
UC_EditPost ..> UC_Login : <<includes>>
UC_DeletePost ..> UC_Login : <<includes>>

%% Extends (alternative flows)
UC_CreatePost ..> UC_Unauthorized : <<extends>>
UC_EditPost ..> UC_Unauthorized : <<extends>>
UC_DeletePost ..> UC_Unauthorized : <<extends>>
UC_ViewPosts ..> UC_SearchPosts : <<extends>>
UC_ViewPosts ..> UC_FilterPosts : <<extends>>
