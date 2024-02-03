# ConstituentManager

ConstituentManager is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. It is designed to manage constituents effectively.

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

## Configuration

6. Create a .env file in the server:
```bash
touch .env
```

7. Add the following configurations to the `/server/.env` file:
```bash
PORT=9090
MONGO_URI=mongodb://0.0.0.0:27017/constituentmanager
```

8. Create a .env file in the client:
```bash
touch .env
```

9. Add the following configurations to the `/client/.env` file:
```bash
REACT_APP_API_URL=http://45.55.42.44:9090
PORT=80
```
## Usage

10. Start the server by running below command in server folder:
```bash
npm start
```

11. In a separate terminal, start the client by running below command in client folder:
```bash
npm start
```

12. Seed the database:
```bash
node server/seed.js 
```

13. Open your browser and go to [http://localhost:80](http://localhost:80) to access 
