# vTodo - Full-Stack Todo List Manager App

vTodo is a full-stack todo list manager application built using the MERN Stack (MongoDB, ExpressJS, ReactJS, NodeJS). With vTodo, users can efficiently manage their tasks and notes by creating, updating, and deleting them. This README provides an overview of the project structure, installation instructions, and basic usage guidelines.

## Features

- **User Authentication**: Users can sign up securely to manage their todo list and notes.
- **Todo List Management**: Users can create, update, and delete tasks in their todo list.
- **Note Management**: Users can manage notes alongside their todo list tasks.
- **Responsive Design**: The application offers a responsive user interface, accessible across various devices.

## Tech Stack

- **Frontend**: ReactJS
- **Backend**: NodeJS, ExpressJS
- **Database**: MongoDB

## Installation

To run vTodo locally, follow these steps:

1. Clone the repository:
    ```
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```
    cd vTodo
    ```

3. Install dependencies for both the frontend and backend:
    ```
    cd client && npm install
    cd ../server && npm install
    ```

4. Set up environment variables:
    - Create a `.env` file in the `server` directory.
    - Define the following variables in the `.env` file:
        ```
        PORT=3001
        MONGODB_URI=<your_mongodb_uri>
        JWT_SECRET=<your_jwt_secret>
        ```

5. Run the backend server:
    ```
    cd server && npm start
    ```

6. Run the frontend server:
    ```
    cd client && npm start
    ```

7. Access the application at `http://localhost:3000` in your web browser.

## Usage

1. **Sign Up**: Register for an account to start managing your todo list and notes.
2. **Log In**: If you already have an account, log in using your credentials.
3. **Todo List Management**: Create, update, or delete tasks in your todo list.
4. **Note Management**: Manage your notes alongside your todo list tasks.
5. **Log Out**: Safely log out of your account when you're done.

## Contributing

Contributions to vTodo are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

Thank you for your interest in contributing!

---

Feel free to reach out if you have any questions or need further assistance. Happy task managing with vTodo! 🚀
