# Movie API

This is a solution for a coding challenge requested by a client who wanted an application that allows users to like movies from a list of movies on the platform. The client also requested the addition of an authentication layer. The authentication layer validates the interactions with the API based on two types of users: Admin and Regular User.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Continued development](#continued-development)
- [Installation](#installation)
- [Author](#author)

## Overview

### The challenge

Regular users should be able to:

- Create an account, log in, like a movie, view all movies, view movies with likes, and retrieve profile information.

Admin users should be able to:

- Add movies, edit movie information, delete movies, create admin users (they can also create regular users if needed), view users in the platform, delete users, ban users, and view movies liked by a specified user.

## My process

### Built with

- Node.JS
- Express
- TypeScript
- TypeORM
- Passport
- Swagger

### What I learned

While building this API, I gained valuable experience in structuring the architecture of an API effectively. I learned how to leverage third-party libraries to enhance authentication mechanisms. Additionally, I became proficient in documenting APIs using Swagger with YAML formatting. I explored the usage of middlewares and custom requests to optimize data loading. Error handling became a crucial aspect, and I ensured to put into practice everything I learned from training sessions. Overall, this experience taught me the importance of well-organized API architecture, utilizing third-party tools, comprehensive documentation, efficient data handling, and consistent application of acquired knowledge.

### Continued development

I will continue enhancing my skills as a backend developer and strive to become an expert in using SQL, enabling me to design even better databases.

## Installation

### Prerequisites

Before running this project, please make sure you have completed the following setup steps:

1- Node.js: Install Node.js from the official website (https://nodejs.org). I recommend using version 18.12.0.
After installation, you can verify the installation by typing the following command in your terminal:

```
node --version
```

Then, you can verify if you have npm installed by typing the following command in your terminal:

```
npm --version
```

I have 9.1.3 specifically.

### Setup

```
cd my-folder
git clone https://github.com/BryanCloudDev/movies_api.git
```

### Install

This project requires additional dependencies. To install them for testing purposes only, please run the following command:

```
npm install --production
```

By running this command, only the necessary dependencies to run the project will be installed.

If you wish to experiment with the code and make modifications, feel free to do so. However, in that case, you may need to execute the following command:

```
npm install
```

In addition to the necessary dependencies, this command will install development dependencies as well.

Now, I have provided a file named .env.example. Inside that file, you will find some environment variables. You need to create a MySQL database named 'movies' and import the seed data that I have also included in the project. Make sure to fill in the missing variable values in the .env file.

Alternatively, you can set the environment variable 'NODE_ENV' to 'production' if you don't want to import the database from the file. In that case, rename the .env.example file to .env and proceed with the following steps to run the seeders.

After all dependencies have been installed, you can run the following command:

```
npm run build
```

Once it finishes, this will create a build that can be deployed. Then, you need to run:
```
npm start
```

This will start a new server where you can see the app running on port 3000 or the port of your choice. You can modify the port as needed. If you set the environment variable to 'production', it will automatically populate the database. Please note that this should only be done when the database is empty. Keeping the variable set to 'development' will display internal server errors, which can be helpful for the development team to identify and address any issues.

The admin user is automatically added, the credentials are:
```
email: example@example.com
password: secretpassword
```

You can go from there to login and create admin users and access the admin endpoints such as:

### Users
```
GET
{base-url}/users/{id}

PATCH
{base-url}/users/{id}

DELETE
{base-url}/users/{id}

GET
{base-url}/users

POST
{base-url}/users/admin

GET
{base-url}/users/{id}/movies
```
### Movies
```
POST
{base-url}/movies

PATCH
{base-url}/movies/{id}

DELETE
{base-url}/movies/{id}
```
### Roles
```
POST
{base-url}/roles

GET
{base-url}/roles

DELETE
{base-url}/roles/{id}
```
The rest of endpoints are available for the admin role and regular user.

You are all set now. You can refer to the Postman collection file that I have shared to see the available endpoints. In the 'development' environment, you can also visit the route {base-url}/api:3000 to access the Swagger documentation.

It was a pleasure working on this project.

## Author

- Website - [bryancloud.dev](https://bryancloud.dev)