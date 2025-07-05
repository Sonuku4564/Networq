# 🌐Networq - Full Stack Professional Networking App

**Networq** is a full-featured professional networking platform inspired by LinkedIn. This application enables users to build their network, share updates, and manage their professional profiles in a sleek and interactive interface.
##  Features

### Authentication
- Sign up / Sign in using JWT tokens
- Secure password storage using Bcrypt
- Email verification and password reset via Mailtrap

### Profile Management
- Upload profile images (via Cloudinary)
- Edit personal info, headline, experience

### Feed
- Create posts with media (images)
- View feed in reverse chronological order
- Like and comment on posts

### Networking
- Connect / disconnect with other users
- View connections
- Suggested connections

### Notifications
- Real-time notifications (using `react-hot-toast`) for actions like post creation, connection requests

## Tech Stack

### Frontend
- **React** 
- **React Router DOM** 
- **@tanstack/react-query**  - For server state and caching
- **Axios** - For API communication
- **Date-fns**  - For date formatting
- **Lucide-react** - Icon library
- **React-hot-toast** - Toast notifications

### Backend
- **Express.js** - Node.js framework
- **MongoDB** (with **Mongoose** ) - Database
- **Cloudinary**  - For image uploads
- **JWT**  - Authentication via tokens
- **Bcryptjs**  - Password hashing
- **Dotenv**  - Environment variable management
- **Cors**  - Cross-origin support
- **Cookie-parser** - validating Cookies


## Screenshots
<img src="frontend/public/networq .png" alt="Home Dashboard" width="700"/>


## Project Installation

#### Clone the project

```bash
git clone https://github.com/your-username/networq.git

```

#### Go to the project directory

```bash
cd networq
```

### Backend Setup

Follow these steps to get the backend up and running:

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    In the `backend` directory, create a new file named **`.env`**.

4.  **Configure environment variables:**
    Add the following variables to your `.env` file

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    MAILTRAP_USER=your_mailtrap_user
    MAILTRAP_PASS=your_mailtrap_password
    CLIENT_URL=http://localhost:3000
    ```


5.  **Start the backend server:**
    ```bash
    npm start
    ```

---

### Frontend Setup

Follow these steps to get the frontend running:

1.  **Navigate back to the project root and then into the `frontend` directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```

## License

This project is licensed under the [ MIT License.](https://choosealicense.com/licenses/mit/)

