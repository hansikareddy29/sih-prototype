# sih-prototype
Automated attendance and resource management system
# Rural School Web App - Prototype

This is a web application prototype for a Rural School Management system, designed to handle student attendance, resource distribution, and reporting. It features a role-based system for Admins, Teachers, and Students.

---

## Prerequisites

Before you begin, ensure you have the following installed:
-   **Node.js** (v18 or later)
-   **npm** (usually comes with Node.js)
-   **Python** (v3.8 or later)

---

## Setup & Installation

Follow these steps to get your development environment running.

### 1. Frontend Setup (Next.js)

Clone the repository and install the necessary Node.js packages.

```bash
# Navigate to the project root directory
cd ruralschoolwebapp

# Install dependencies
npm install

# Navigate to the server directory
cd server

# Create a Python virtual environment
python3 -m venv venv

# Activate the virtual environment
# On macOS or Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install Python dependencies
pip install fastapi "uvicorn[standard]"

# After installation, you can navigate back to the root
cd ..

You must have two separate terminal windows open to run both the backend and frontend servers simultaneously.

1)Start the Backend Server(In your first terminal:)


# Navigate to the server directory
cd server

# Activate the virtual environment (if not already active)
source venv/bin/activate

# Start the FastAPI server
uvicorn main:app --reload


2)Start the Frontend Server(In your second terminal:)

# Navigate to the project root directory
cd ruralschoolwebapp

# Start the Next.js development server
npm run dev

3)Access the Application

Open your web browser and navigate to http://localhost:3000. You will be redirected to the login page.