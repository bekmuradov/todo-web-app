# todo-web-app
## Example of todo web app using Postgresql, Sequelize, Express, Quasar (Vue 3) and Node.js.
This is an example of a simple CRUD application with layered software and separation of business logic vs technology.

It is a simple web app for creating `todolists` and `todolistitems` and includes authentication, validation, persistence and UI.

I tried to follow this Clean Architecture rules:
1. **Independent of Frameworks**. Libraries and frameworks should be treated as tools and not dependencies.
2. **Testable**. Can be tested without external dependencies.
3. **Independent of UI**. You can easily switch CLI.
4. **Independent of Database**. Switch out SQL for Postgresql.
5. **Independent of any external agency**. Business rules don't know anything about outside world.


## Note: Please make the .env file before using. Follow the env.example file.
1. Generate sekret key ```node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"``` and put in .env TOKEN_SECRET
2. Create the Postgresql database ```createdb 'database-name'``` and put in .env DB_NAME
3. Use Postgresql connection string / URL and put it in DEV_DB_URL (otherwise change the src/api/config/dbConfig.js file)
4. You are ready to install dependecies


To install dependecies:

    * navigate to server forder and run the following
    * yarn install
        - to install dependencies
    * yarn start
        - to run the project
    * (optional) to insert first data to database
        - change the environment to 'TEST'
        - it seed some data
        - you can find it in the main index.js file
        ```
        if (process.env.NODE_ENV === 'test') {
          seeder().then(() => {
            console.log('Seeding done.')
          })
        }
        ```
        - to drop the tables change ```db.sequelize.sync({ alter: true })``` to ```db.sequelize.sync({ force: true })``` main index,js file on line 8

      * if app doesn't start it mostly because there is no connection to Database
      * at start the app will check the connection first

The application is separated into three layers. Inner layers cannot depend on outer layers and outer layers should only depend one layer in:

- **Inner Layer**
- **Entities**. Handles the creation, validation and reading of our entities (users, todolists, todoitems and userTokens).
- **dbConfig**. Any choice of DB (in memory, Postgresql, MongoDB, SQL), this is independent of the model.
- **Middle Layer**
- **Controllers & Services**. Handles transfer between the DB (like an ORM). Depends on the model to validate and create the entity in DB. The key is to have a consistent & custom API that all outer layers communicate with. Testing here will ensure that replacing or using multiple DBs doesn't break anything further upstream.
- **Outer Layer**
- **Routes**. Represents the UI or interface (Web or CLI). It communicates only with the Middle layer.

### Example application structure
```bash
============= INNER LAYER =====================================================================
entities/                  // create new entity or update by validating payload and returning new read (getters) only object

  L todoListItems
    L index.js             // dependency inject schema/ validation library
    L makeTodoListItem.js  // makeTodoListItem()
    L patchTodoListItem.js // patchTodoListItem()
  L todoLists
    L index.js             // dependency inject schema/ validation library
    L makeTodoList.js      // makeTodoList()
    L patchTodoList.js     // patchTodoList()
  L users
    L index.js             // dependency inject schema/ validation library
    L makeUser.js          // makeUser()
  L userTOkens
    L index.js             // dependency inject schema/ validation library
    L makeUserToken.js     // makeUserToken()

validator/                 // wrapper around JOI validation library
    L index.js             // tests for validation schema for all models
    L todoListItemSchema.js
    L todoListSchema.js
    L userSchema.js
    L userTokenSchema.js

config/                     // db connection and adapter (sequelize), passport strategy, global constants
    L authConstants.js      // constants like JWT TOKEN_SECRET or EXPIRES_IN
    L dbConfig.js           // db settings
    L dbConnection.js       // connection library
    L passportStrategy      // custom strategy 'client-rule'

============= MIDDLE LAYER =====================================================================
services/                   // think of it as our internal ORM (logic for our use-cases lies here)
    L authService.js        // generates tokens           
    L dbService.js          // controllers rely on this API (findAll, createMany, findByPk, updateMany, and .etc)

controllers/                // per each entity above

============= OUTER LAYER =====================================================================
routes/                     // routes paths
     L autRoutes.js         // register, login, signout
     L publicRoute.js       // creates a magic link with 24 hour expiration time and validates the request to access the todoitem via magic link
     L todoListItemRoutes.js // routes with GET, PUT, POST, DELETE methods based on request
     L todoListRoutes.js     // routes with GET, PUT, POST, DELETE methods based on request

middlewares/
    L authenticateJWT.js     // to validate the magic link
    L isAuthenticated.js     // to validate all requests to the above routes, except register and login routes

============= HELPER FUNCTIONS =====================================================================
helpers/
    L adaptRequest.js        // return new read only request object, it cannot be changed
    L sendResponse.js        // helper func to return the response
utils/
    L errorHandler.js         // global error error handler
    L responseCodes.js
    L responseMessages.js     // custom response messages to handle different situations
    L uniqueValidation.js     // check is user is unique, using it in the authController before registration

__tests__/                     // jest tests to test run yarn test from the command line
    L auth.test.js             // should register a user, login, should throw error when login with wrong credentials
    L todolist.test.js         // test makeTodoList(), patchTodoList(), tests the response if invalid data
    L todolistitem.test.js     // test makeTodoListItem(), patchTodoListItem(), tests the response if invalid data
    L user.test.js             // test makeTodoUser(), tests the response if invalid data
```

**Futher improvements needs to be implemented:**
1. Implement reset password route
2. Implement email verification, like sending a link to an email, then user redirectes with that link
3. implement access and refresh token authentication strategy
4. Implement short url for magic links
5. Implement role access logic


Resources:
1. [Clean Architecture in Node.js](https://mannhowie.com/clean-architecture-node)
2. Uncle Bob's famous [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) is a way to write resilient software.
