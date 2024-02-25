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
    git clone https://github.com/viktorsynek/vtodo.git
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
        PORT;
        DB_URI;
        JWT_SECRET;
        ```

5. Run the backend server:
    ```
    cd server && npm start
    ```

6. Run the frontend server:
    ```
    cd client && npm start
    ```

7. Access the application at `http://localhost` in your web browser (with your given port).

## Usage

1. **Sign Up**: Register for an account to start managing your todo list and notes.
2. **Log In**: If you already have an account, log in using your credentials.
3. **Todo List Management**: Create, update, or delete tasks in your todo list.
4. **Log Out**: Safely log out of your account when you're done.

## Contributing

Contributions to vTodo are welcome!

---

Feel free to reach out if you have any questions or need further assistance. Happy task managing with vTodo! 🚀
