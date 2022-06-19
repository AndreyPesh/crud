# CRUD-API

## Run server

```bash
    npm i
    npm run start:dev
```

> :warning: **If you are not using Windows and the app is not working.** 
**Try change the variable HOSTNAME_SERVER in the `.env` file**: HOSTNAME_SERVER=http://your_hostname

## Endpoints:

- `Users` (`/api/users` route)

  - `GET /api/users` - get all users

  - `GET /api/users/id` - get user by id `id must be uuid format`

  - `POST /api/users` - create record about new user and store it in database

  - `PUT /api/users/id` - update existing user

  - `DELETE /api/users/id` - delete existing user from database

### Data creating user

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
