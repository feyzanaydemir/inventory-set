# Inventory Set

![Preview](preview.png)

## Overview

Inventory Set is a full stack item management application. It was created using React, Node.js, Express.js and MongoDB. User authentication was implemented using JWT. This project is currently deployed and hosted on a cloud platform called Render as a demo site.

- [**See Live**](https://inventoryset.onrender.com) (Note: Render can take up to **1 minute to "wake up"** web services)

- **Features**
  - Sign in, sign up (JWT)
  - Create, edit, delete items
  - Item and brand names, custom categories, price and quantity information
  - Find items using letters/words and/or filters
  - Browse recently added items

## Installation

Make sure you have Node.js version >= 14.7.3 installed. Either use your OS's package manager or follow the instructions [here](https://nodejs.org/en/). This project uses MongoDB as its database. If you don't have it installed or not sure how to make the connection follow [these instructions](https://docs.mongodb.com/manual/installation/#mongodb-community-edition). Then, manually download this repository or clone it by running the command below.

```
$ git clone https://github.com/feyzanaydemir/inventory-set.git
```

- Change into the `/inventory-set` directory and install the server side requirements.

  ```
  $ cd inventory-set
  $ npm install
  ```

  To start the Node.js server and access it at `http://localhost:8080`, run:

  ```
  $ node app.js
  ```

- Change into the `/frontend` directory and install the client side requirements.

  ```
  $ cd frontend
  $ npm install
  ```

  To start the React development server and access it at `http://localhost:3000`, run:

  ```
  $ npm start
  ```

### Enviroment Variables

```
GUEST_PASSWORD=
GUEST_EMAIL=
SECRET=
ORIGIN=
DB_URI=
```
