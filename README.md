# OrderEats

OrderEats is a full-stack food ordering platform that allows users to customize orders, and complete secure payments online. The application is built with React for the frontend and Node.js with Express for the backend, using MongoDB as the database and Stripe for payment processing.

## Features

- User authentication and account management
- Menu item customization
- Shopping cart functionality
- Secure checkout with Stripe payment gateway
- Order tracking and history
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- HTML5/CSS
- React Router
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Stripe API for payments
- JWT for authentication

### Development Tools
- VS Code
- Postman for API testing
- Figma for design

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)
- Stripe account for payment processing


1. Clone the repository
```bash
git clone https://github.com/devrajsinh-d-jethwa/OrderEats.git
cd OrderEats
```

### Frontend Setup
2. Install dependencies
```bash
cd Frontend
npm install
```


4. Start the development server
```bash
npm run dev
```

### Backend Setup
1. Navigate to the backend directory
```bash
cd Backend
```

2. Install dependencies
```bash
npm install
```

4. Start the server
```bash
npx nodemon
```

## Project Structure

```
orderEats/
│
├── frontend/              # React frontend
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # React components
│       ├── pages/         # Page components
│       └── App.jsx         # Main App component
│
└── backend/               # Node.js backend
    ├── uploads/            # Upload files
    ├── controllers/       # Route controllers
    ├── models/            # MongoDB models
    ├── routes/            # Express routes
    ├── middleware/        # Custom middleware
    └── server.js          # Entry point
```
