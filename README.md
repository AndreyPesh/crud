# crud

## Run server

```bash
    npm i
    npm run start:dev
```

## Endpoints:

- `Users` (`/api/users` route)

  - `GET /api/users` - get all users

  - `GET /api/users/id` - get user by id `id must be uuid format`

  - `POST /api/users` - create record about new user and store it in database

  - `PUT /api/users/id` - update existing user

  - `DELETE /api/users/id` - delete existing user from database

### Example data creating user

- `id` — unique identifier (`string, uuid`) generated on server side
- `username` — user's name (`string, required`)
- `age` — user's age (`number, required`)
- `hobbies` — user's hobbies (`array of strings or empty array, required`)

**_The data must be send to the server in the format JSON_**

**Example data for Postman**

```bash
 {
    "username": "Person",
    "age": 25,
    "hobbies": ["Art"]
 }
```

> :warning: **If you are using mobile browser**: Be very careful here!
