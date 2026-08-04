# Modules

Keep feature-specific code here, one folder per domain.

Suggested shape for a feature:

```text
src/modules/users/
  users.route.ts
  users.service.ts
  users.repository.ts
  users.schema.ts
```

Use this when a domain starts to grow beyond a few route handlers. Put request validation in schema files, database calls in repositories, and business logic in services.
