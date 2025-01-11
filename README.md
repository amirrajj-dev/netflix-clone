# 📽️ Netflix Clone

This is a full-stack MERN clone of Netflix featuring both backend and frontend with various functionalities. Below you'll find an overview of the project, technology stack, and instructions on how to set up the project.

## 📑 Table of Contents

1. [📽️ Project Overview](#-project-overview)
2. [🛠️ Backend Routes](#️-backend-routes)
3. [💻 Tech Stack](#-tech-stack)
4. [⚙️ Setup Instructions](#️-setup-instructions)

## 📽️ Project Overview

This Netflix clone allows users to browse and search for movies and TV shows and actors, view detailed information about each, and manage their watch history.

### 📊 Backend

The backend is built using **Express.js** and **MongoDB** and includes routes for authentication, managing movies and TV shows, and search functionalities.

### 🖥️ Frontend

The frontend is built using **React.js** and includes pages for Home, Login, Signup, Search, and Detail views.

## 🛠️ Backend Routes

### 🔒 Authentication

| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| POST   | /api/auth/signup | User signup          |
| POST   | /api/auth/login  | User login           |
| POST   | /api/auth/logout | User logout          |
| GET    | /api/auth/me     | Get current user info|

### 🎬 Movies

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/movies/trending   | Get trending movies             |
| GET    | /api/movies/:id/trailers | Get movie trailers            |
| GET    | /api/movies/:id/details | Get movie details              |
| GET    | /api/movies/:id/simillar | Get similar movies            |
| GET    | /api/movies/:category  | Get movies by category          |

### 📺 TV Shows

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| GET    | /api/tv/trending       | Get trending TV shows           |
| GET    | /api/tv/:id/trailers   | Get TV show trailers           |
| GET    | /api/tv/:id/details    | Get TV show details            |
| GET    | /api/tv/:id/simillar   | Get similar TV shows           |
| GET    | /api/tv/:category      | Get TV shows by category       |

### 🔍 Search

| Method | Endpoint                  | Description                            |
|--------|---------------------------|----------------------------------------|
| GET    | /api/search/person/:query | Search for a person                    |
| GET    | /api/search/movie/:query  | Search for a movie                     |
| GET    | /api/search/tv/:query     | Search for a TV show                   |
| GET    | /api/search/history       | Get search history                     |
| DELETE | /api/search/history/:id   | Delete one item from search history    |

## 💻 Tech Stack

### 🛞 Backend
- **Express.js**: 🚀 Backend framework
- **MongoDB**: 🛢️ Database
- **bcryptjs**: 🔐 Password hashing
- **cookie-parser**: 🍪 Cookie management
- **jsonwebtoken**: 🔏 JWT for token authentication
- **mongoose**: 🌿 MongoDB object modeling
- **axios**: 📡 HTTP client for making HTTP requests
- **dotenv**: 📜 Environment variables management for API keys and secrets

### 🖥️ Frontend
- **React.js**: ⚛️ JavaScript library for building user interfaces
- **Redux**: 🗂️ State management
- **axios**: 📡 Handling HTTP requests
- **react-hot-toast**: 🔥 Notifications
- **react-player**: 🎥 Media player component
- **react-router-dom**: 🛤️ Enables navigation among views
- **zustand**: 🌳 State management
- **OpenWeather API**: 🌦️ To get weather data
- **The Movie Database (TMDb) API**: 🎬 To fetch movie and TV show data
- **react-icons**: 🖼️ For including icons in the user interface

### ⚙️ Setup Instructions

1. 📋 Clone the repo:

```js
git clone https://github.com/amirrajj-dev/netflix-clone.git
```

2. 📋 in the root of the netflix-clone project use the following command in terminal of your code editor or ide or cmd :

```js
npm run build
```

3. Create a .env file in the root of your project directory and add your API keys.

```js
PORT=5000
MONGO_URL=Your_Mongo_Url_here : (example : "mongodb://localhost:27017/netflix-clone")
SECRET_KEY=Your_secret_key_here : (example : "a5692fb8b463323b591f41ccb0c39eec179b93e8cc67afb1db7064c71ee337a9")
TMDB_API_KEY=Your_tmdb_api_key_here : (example : "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzk0ZTgxNzQxZmNhNWUwZTUxYmE3OWRkZmZkNGQxOCIsIm5iZiI6MTczMzY3ODg0OC4yNzAwMDAyLCJzdWIiOiI2NzU1ZDcwMDZlMGJlZDI2NmI3ZjhhNmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vUAf64rxmNuAPueYGhf57H54YcErt3KnbhsliiVHczo")
```

4. if you made sure that you handled the previous orders right then use the following command to start the project : 

```js
npm run start
```

and thats it ! open http://localhost:5000 and see the project⚡

## ⚠️ Warning 

if you cant see the movies or tv shows (or you see a shimmer or skeleton for theit cover) its probably beacuse you need to use a high speed vpn so turn on your vpn and reload the page and if its needed be a little  patient for me🥺😉🫂 

# End🔚

Hope You like this porject my firend🫂❣️😉
