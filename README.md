# Password Manager

SecurePass is a secure and reliable password management web application built with the MERN stack (MongoDB, Express, React, Node.js). It allows you to store and manage your passwords in an encrypted format, ensuring easy access and strong security for all your accounts.

## Features

- **User Authentication**: Signup and login functionality for personalized password management.
- **Password Encryption**: All passwords are stored securely in an encrypted format.
- **Add, View, Delete Passwords**: Easily add new passwords, view existing ones, or delete them when needed.
- **Responsive Design**: The application is designed to work well across different devices, from desktops to mobiles.

## Tech Stack

- **Frontend**: React, TailwindCSS for modern styling.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB for data persistence.
- **Security**: Passwords are hashed with bcrypt and encrypted using CryptoJS for secure storage.

## Installation

To get started with SecurePass locally, follow these steps:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or using MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/anubhav047/Password-Manager.git
cd Password-Manager
```

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```
   MONGO_URI=<Your MongoDB Connection String>
   JWT_SECRET=<Your JWT Secret Key>
   ```
4. Start the backend server:
   ```bash
   node server
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file:
   ```
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```
4. Start the React development server:
   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` in your browser.
- Signup or login to start managing your passwords securely.


## Contributing

Contributions are welcome! Please fork the repository and create a pull request to contribute to the project.


## Contact

If you have any questions or suggestions, feel free to open an issue or contact me at [goelanubhav2003@gmail.com].

