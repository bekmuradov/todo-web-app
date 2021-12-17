# todo-web-app
## Example of todo web app using Postgresql, Sequelize, Express, Quasar (Vue 3) and Node.js.
This is an example of a simple CRUD application with layered software and separation of business logic vs technology.

It is a simple web app for creating `todolists` and `todolistitems` and includes authentication, validation, and UI.

### Features:
- [x] Users could to create an account
- [x] Users must be authenticated before using the application
- [x] Each user can have multiple to-do list
- [x] The to-do item should be able to get shared publicly via generated link
- [x] The to-do item can contain simple text string
- [x] The to-do item can be marked as done

I tried to follow this Clean Architecture rules:
1. **Independent of Frameworks**. Libraries and frameworks should be treated as tools and not dependencies.
2. **Testable**. Can be tested without external dependencies.
3. **Independent of UI**. You can easily switch CLI.
4. **Independent of Database**. Switch out SQL for Postgresql.
5. **Independent of any external agency**. Business rules don't know anything about outside world.

Entities and Service are main files and logic of the app.

**For more go to:**
- [server/README.md](https://github.com/bekmuradov/todo-web-app/tree/main/server)
- [client/README.md](https://github.com/bekmuradov/todo-web-app/tree/main/client)

Resources:
1. [Clean Architecture in Node.js](https://mannhowie.com/clean-architecture-node)
2. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.
