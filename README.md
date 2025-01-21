# Chatbot App
This project consists of a backend and a frontend. Below are the instructions to set up, install, and run the project.

In this project, I took the opportunity to use Node.js (with Express.js as the framework) and React to create an awesome mini-application that interacts with user messages and responds to them based on predefined keyword-response pairs.

## App Features:

### Chat Interface:

A minimalistic front-end interface for chatting and uploading keyword-response pairs.

- **Backend Endpoints:**

Developed backend endpoints to receive user messages and process responses accordingly.

- **Keyword Detection System:**

Detects specific keywords in user messages and returns appropriate responses.

- **Security Enhancements:**

Rate limiting to prevent excessive requests from users.

XSS protection to mitigate security risks.

API access restriction to allow requests only from a single trusted host.

- **Error Handling:**

Proper error handling for both backend and frontend.

Displaying loading states when fetching data from APIs.

Implementing an error boundary to manage unexpected frontend errors or backend crashes.

- **Database Integration:**

Utilized Prisma ORM to interact with a local MySQL database efficiently.

This project showcases my skills in full-stack development, focusing on data validation, security enhancements, and user-friendly interactions.

## App Demo

- **installation:**
  
https://github.com/user-attachments/assets/01fbe9c3-3556-4370-93a9-9e47f8338736
- **Demo:**
  
https://github.com/user-attachments/assets/a5ca7b4c-b3e1-4c83-b8e4-382453e179f4

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Running the Project](#running-the-project)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.20 or higher)
- **npm** (v9 or higher)
- **Git** (for cloning the repository)

## Installation

Follow these steps to install and set up the project:

### Database

setup local database with the name chatbotmvp or a new one, and put the URL into ./backend/.env

### Install Dependencies

Move into the project directory

Run the installation script:

chmod +x install.sh

and

./install.sh


### Manual Installation

1. Install root dependencies:
npm install

2. Install backend dependencies:
cd backend
npm install
cd ..

3. Install frontend dependencies:
cd frontend
npm install
cd ..

## running-the-project

To run both the backend and frontend simultaneously in development mode, use:

npm run dev
