# todo-web-app
## Example of Clean Architecture in Node.js
This is an example of a simple CRUD application with layered software and separation of business logic vs technology.

It is a simple API for creating `todolists` and `todolistitems` and includes validation, persistence and UI.

I tried to follow this Clean Architecture rules:
1. **Independent of Frameworks**. Libraries and frameworks should be treated as tools and not dependencies.
2. **Testable**. Can be tested without external dependencies.
3. **Independent of UI**. You can easily switch CLI.
4. **Independent of Database**. Switch out SQL for Postgresql.
5. **Independent of any external agency**. Business rules don't know anything about outside world.


Resources:
[Clean Architecture in Node.js](https://mannhowie.com/clean-architecture-node)

Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.

