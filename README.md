# 🍽️ Foodeo

Foodeo is a creative social platform for food lovers where short, engaging food reels take the spotlight. Explore, share, and enjoy bite-sized food videos — from mouth-watering recipes and street food adventures to restaurant highlights and kitchen hacks.

---

## Live Link 🎉
You can view the live preview of the project here:  
👉 [foodeo-lilac.vercel.app](https://foodeo-lilac.vercel.app/)

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
- Database: MongoDB

### Additional Tools
- Authentication & Authorization (JWT or Session-based)
- File upload handling (implementation-specific)

---

## ⚙️ Installation

### Prerequisites
- Node.js
- npm or yarn
- `.env` setup for both client and server

### Steps to Run Locally

1. **Clone the Repository**
```bash
git clone https://github.com/Irfanabdul1108/talknlearn.git
```

2. **Navigate to the Backend folder**
```bash
cd talknlearn/backend
```

3. **Setup Environment Variables**  
Create a `.env` file with required variables (MongoDB URI, JWT secret, Stream credentials).

4. **Install Backend Dependencies**
```bash
npm install
```

5. **Run the Backend**
```bash
npm run dev
```

6. **Navigate to the Frontend folder**
```bash
cd talknlearn/frontend 
```

7. **Setup Frontend Environment Variables**(if any)

8. **Install Frontend Dependencies**
```bash
npm install
```

9. **Run the Frontend**
```bash
npm run dev
```

10. **Visit the App**
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Sample File Structure

```
talknlearn/
├── frontend/          # React frontend
│   └── src/
│       └── Routes/
│       └── assets/
│       └── components/
│       └── pages/
|       └── styles/
|       - App.css
        - App.jsx
        - main.jsx
├── backend/          # Express backend
│   └── src/
│       └── routes/
│       └── controllers/
│       └── middlewares/
│       └── db/
|       └── routes/
|       └── services/
|       - index.js
├── README.md
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
- Backend: Render

---

## 📬 Contact

For queries, collaborations, or opportunities, reach out:
- Email: abdulirfan1108@gmail.com
- LinkedIn: https://www.linkedin.com/in/abdul-irfan-53728a270/

---

Thank you for exploring Foodeo! Hope you enjoy using it as much as I enjoyed building it. 🍔🎬✨
