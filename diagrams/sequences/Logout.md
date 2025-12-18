```markdown
# Logout Sequence Diagram

```mermaid
sequenceDiagram
    actor User
    participant FE as "React Frontend"

    User->>FE: Click logout

    alt Token exists
        FE->>FE: Remove JWT token
        FE-->>User: Logged out successfully
    else No token found
        FE-->>User: Already logged out
    end
