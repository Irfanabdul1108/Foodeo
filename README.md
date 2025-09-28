# 🍽️ Foodeo

Foodeo is a creative social platform for food lovers where short, engaging food reels take the spotlight. Explore, share, and enjoy bite-sized food videos — from mouth-watering recipes and street food adventures to restaurant highlights and kitchen hacks.

---

## Live Link 🎉
You can view the live preview of the project here:  
👉 https://foodeo.vercel.app/

---

## 🚀 Features

### 1. Authentication & Protected Routes
- Secure login and registration system.
- Protect user data with guarded routes.

### 2. Profile Management
- Update user details and manage account settings.
- Personalized profiles featuring your reels and activity.

### 3. Reels (CRUD)
- Create, read, update, and delete food reels.
- Seamless and instant interactions for a smooth UX.

### 4. Like & Save
- Like reels with immediate feedback.
- Save reels for later viewing.

### 5. Responsive Design
- Fully responsive for desktop and mobile.
- Built with modern UI/UX principles.

### 6. Media Handling
- Supports short video uploads.
- Optional local storage via a videos/ directory (or integrate a cloud provider).

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- CSS

### Backend
- Node.js + Express
- Database: MongoDB (or Firebase, based on your setup)

### Additional Tools
- Authentication & Authorization (JWT or Session-based)
- File upload handling (implementation-specific)

---

## ⚙️ Installation

### Prerequisites
- Node.js and npm (or yarn)
- A configured database (e.g., MongoDB or Firebase)
- Environment variables for frontend and backend

### 1) Clone the Repository
```bash
git clone https://github.com/Irfanabdul1108/foodeo.git
```

### 2) Backend Setup
```bash
cd foodeo/backend
npm install
```

Create a .env file in backend/ with the required variables. Example (MongoDB + JWT):
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

If using Firebase instead of MongoDB, configure your Firebase credentials (example):
```bash
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_STORAGE_BUCKET=your_bucket
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

Run the backend:
```bash
npm run dev
```

### 3) Frontend Setup
Open a new terminal:
```bash
cd foodeo/frontend
npm install
```

Create a .env file in frontend/ (Vite example):
```bash
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

### 4) Visit the App
Open http://localhost:5173 in your browser.

---

## 📁 Sample File Structure

```
Foodeo/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/          # (If using MongoDB/Mongoose)
│   │   ├── middleware/
│   │   └── utils/
│   ├── package.json
│   └── .env                 # (Not committed)
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/
│   ├── index.html
│   ├── package.json
│   └── .env                 # (Not committed)
├── videos/                  # Static/local video uploads (optional)
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `feature/your-feature-name`.
3. Commit your changes.
4. Push to your fork.
5. Open a Pull Request.

---

## 🚀 Deployment

- Frontend: Vercel
- Backend: Render / Railway / Heroku (choose your preferred provider)

Make sure to:
- Set environment variables on the hosting platforms (same as your local .env).
- Update VITE_API_BASE_URL in the frontend to point to your deployed backend URL.

---

## 📬 Contact

For queries, collaborations, or opportunities, reach out:
- Email: abdulirfan1108@gmail.com
- LinkedIn: https://www.linkedin.com/in/abdul-irfan-53728a270/

---

Thank you for exploring Foodeo! Hope you enjoy using it as much as I enjoyed building it. 🍔🎬✨
