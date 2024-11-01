# Title Management App

## Key Features

- **Login & Registration**: Users can securely log in or register using their email and password.
- **JWT Management**: Session management is handled through JSON Web Tokens (JWT), ensuring secure user sessions across the app.
- **Title Management**: Users can view, add, and delete titles directly from the dashboard.
- **MetaMask Integration**: Connects with MetaMask via Ethers.js to retrieve the user’s wallet address. Only users with a connected MetaMask wallet can add or delete titles, providing an additional layer of user verification.
- **Component Testing**: Component (e.g., register form, add title form) is covered by unit tests, ensuring functionality and reliability.

## Prerequisites

- Node.js
- npm
- MetaMask (browser extension)
- MySQL
- Set up environment variables following the format in .env.example

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/A-dith-ya/title-management-app.git
   ```

2. Navigate to the project folder and install dependencies for both back-end and front-end:

   ```bash
   cd title-management-app
   npm install
   cd title-management-frontend/
   npm install
   ```

3. Start the Express server from the title-management-app directory:

   ```bash
   npm run dev
   ```

4. Start the React server from the title-management-frontend directory:

   ```bash
   npm run dev
   ```

## Testing

1. Run the React tests in the title-management-frontend directory:
   ```bash
   npm test
   ```

## Project Structure

- **`title-management-app/`**: The root directory for the backend server (Express).
- **`title-management-frontend/`**: Contains the React frontend.
- **`src/components/`**: Holds reusable UI components like `LoginForm`, `RegisterForm`, `TitleList`, and `WalletConnect`.
- **`src/features/auth/`**: Redux slice and actions for user authentication.
- **`src/services/`**: API interaction logic for the frontend.
- **`src/pages/`**: Main app pages such as `DashboardPage`, `LoginPage`, and `RegisterPage`.
- **`src/tests/`**: Unit tests for components.
