# Memories-App

### Built with the MERN stack (MongoDB, Express, React and NodeJS).
![ezgif com-gif-maker-2](https://user-images.githubusercontent.com/67745591/185786916-a0960afa-7911-4aee-a854-75bb2cbe86be.gif)


### Roadmap
---
*  [Introduction](https://github.com/RobertoJoseph/Memories-App#introduction "Named link title")
*  [Key Features](https://github.com/RobertoJoseph/Memories-App#key-features "Named link title")
*  [Technologies used](https://github.com/RobertoJoseph/Memories-APp#technologies-used "Named link title")


### Introduction
---
This is a side project I've been working on. A full stack social media  application made using the MERN stack (MongoDB, Express, React & Nodejs), specially designed for practice. With this application, you can create, update, like, delete posts and create comments. Download the entire Source code and run it on your server. This project is something I've been working on in my free time so I cannot be sure that everything will work out correctly. But I'll appreciate you if can report any issue.

### Key Features
---
* Create/Delete/Update/Like posts via the user.
* Search by title/tags and use Pagination feature.
* Multiple user registration.
* Authentication using jsonwebtoken (jwt) and Google auth.

### Technologies used
---
 Client
 * React
 * Redux (Redux (for managing and centralizing application state)
 * React-router-dom (To handle routing)
 * Axios (for making api calls)
 * Material UI & CSS Module (for User Interface)
 * React-google-login (To enable authentication using Google)

 Server
  * Express
  * Nodejs
  * Mongoose
  * JWT (For authentication
  * bcryptjs (for data encryption)

 Database
  * MongoDB (MongoDB Atlas)

### Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.
 * Open the project in your prefered code editor.
 * Go to terminal -> New terminal (If you are using VS code)
 * Split your terminal into two (run the client on one terminal and the server on the other terminal) 

In the first terminal
 * cd server and create a .env file in the root of your client directory.
 * Supply the following credentials

```javascript
PORT= 8000
CONNECTION_URL=mongodb+srv://username:password@cluster0.tmwp1g9.mongodb.net/?retryWrites=true&w=majority
```

To get your Google ClientID for authentication, go to the credential Page (if you are new, then create a new project first and follow the following steps;

* Click Create credentials > OAuth client ID.
* Select the Web application type.
* Name your OAuth client and click Create
* Remember to provide your domain and redirect URL so that Google identifies the origin domain to which it can display the consent (screen. In development, that is going to be http://localhost:3000 and http://localhost:3000/login
* Copy the Client ID and assign it to the variable REACT_APP_GOOGLE_CLIENT_ID in your .env file

```javascript
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```

## END POINTS
---

Our Api is divided into 6 parts

### Users Router 
#### Route : `/users`


#### Add Trainee
- Route : `/signup`
- Request Type : `post`
- Request Body : 
 ```javascript
  {
  firstName: 'Roberto',
  lastName: 'Joseph',
  email: 'robertojoseph@gmail.com',
  password: 'pass12345',
  gender:"Male",
  
 }
 Response Body:
  {
  result: {firstName:"Roberto", lastName:"Joseph",email:"robertojoseph@gmail.com",password:"hashedPassword",gender:"Male"}, token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  type:"individualTrainee"
  }
  
  ```

