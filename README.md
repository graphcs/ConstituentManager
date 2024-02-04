# ConstituentManager

ConstituentManager is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. It is designed to manage constituents effectively.

Live link: http://www.constituentmanager.com/

Video demo:

https://www.loom.com/share/2b45b9c053154a3e93785e024e4c02b1

Screenshot:

<img width="1022" alt="Screen Shot 2024-02-03 at 7 43 48 PM" src="https://github.com/graphcs/ConstituentManager/assets/2300922/57f88e31-65e1-40b9-ba4d-0538b01ad2b8">


## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add Constituents:** Easily add new constituents with relevant details.
- **View Constituents:** Browse and search through the list of constituents.
- **Update** Modify existing constituents.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure MongoDB server is running)

## Installation

1. Clone the repository:

```bash

git clone https://github.com/graphcs/ConstituentManager

```

2. Navigate to the project directory:
```bash
cd ConstituentManager
```

3. Install server dependencies:
```bash
npm install
```

4. Move to the client directory and install client dependencies:
```bash
cd client
npm install
```

5. Return to the project root:
```bash
cd ..
```

## Database setup

6. Install Docker: https://docs.docker.com/get-docker/

7. Set up docker volume for mongodb:
```bash
docker volume create mongodbdata
```

8. Start MongoDB in docker with volume for data persistence:
```
docker run -d --name mongodb -v mongodbdata:/data/db -p 127.0.0.1:27017:27017 mongo
```

9. Seed the database:
```bash
mern-app# cd server 
mern-app# node seed.js 
mongodb://0.0.0.0:27017/constituentmanager
connected
Database seeded successfully.
mern-app 
```

## Configuration

10. Create a .env file in the server:
```bash
touch .env
```

11. Add the following configurations to the `/server/.env` file:
```bash
PORT=9090
MONGO_URI=mongodb://0.0.0.0:27017/constituentmanager
```

12. Create a .env file in the client:
```bash
touch .env
```

13. Add the following configurations to the `/client/.env` file:
```bash
REACT_APP_API_URL=http://45.55.42.44:9090
PORT=80
```
## Usage

14. Start the server by running below command in server folder:
```bash
npm start
```

15. In a separate terminal, start the client by running below command in client folder:
```bash
npm start
```

16. Open your browser and go to [http://localhost:80](http://localhost:80) to access 

17. You can also start and restart server using `pm2` (from server folder):

```bash
npm install pm2 -g        
pm2 start npm --name "mern-app-server" -- start
pm2 restart mern-app      
```

for client:

```bash
pm2 start npm --name "mern-app-client" -- start
```

18. To rebuild the client:
```bash
mern-app# cd client 
mern-app# npm run build
```

19. To run server tests:
```bash
cd server
npm test```
