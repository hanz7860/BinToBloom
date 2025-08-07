<<<<<<< HEAD
# BinToBloom - Waste Management Platform
=======

# 🌱 BinToBloom : Full-Stack Sustainability Platform for Smart Waste Collection
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

A full-stack waste management platform that connects donors with collectors to transform food waste into eco-friendly pesticides.

## 🚀 Features

- **JWT Authentication & Authorization**
- **Role-based Access Control** (Donor/Collector)
- **Location-based Pickup System**
- **Real-time Notifications**
- **Responsive Design**
- **Environmental Impact Tracking**

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Spring Boot 3.2
- Spring Security with JWT
- Spring Data JPA
- MySQL Database
- Maven for dependency management

## 📋 Prerequisites

- Node.js 16+ and npm
- Java 17+
- MySQL 8.0+
- Maven 3.6+

## 🔧 Installation & Setup

### 1. Clone the Repository
<<<<<<< HEAD
```bash
git clone <repository-url>
cd waste-management-platform
```

### 2. Database Setup
```bash
=======
\`\`\`bash
git clone <repository-url>
cd waste-management-platform
\`\`\`

### 2. Database Setup
\`\`\`bash
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
# Create MySQL database
mysql -u root -p
CREATE DATABASE waste_management_db;

# Run schema and sample data
mysql -u root -p waste_management_db < database/schema.sql
mysql -u root -p waste_management_db < database/sample_data.sql
<<<<<<< HEAD
```

### 3. Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
=======
\`\`\`

### 3. Backend Setup
\`\`\`bash
cd backend
mvn clean install
mvn spring-boot:run
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
<<<<<<< HEAD
```bash
=======
\`\`\`bash
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
# Install dependencies
npm install

# Start development server
<<<<<<< HEAD
npm run dev
```
=======
npm start
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

The frontend will start on `http://localhost:3000`

### 5. Using Docker (Alternative)
<<<<<<< HEAD
```bash
# Build and run with Docker Compose
docker-compose up --build
```
=======
\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

## 🔑 Environment Variables

### Backend (application.properties)
<<<<<<< HEAD
```properties
=======
\`\`\`properties
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
spring.datasource.url=jdbc:mysql://localhost:3306/waste_management_db
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
cors.allowed-origins=http://localhost:3000
<<<<<<< HEAD
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
```
=======
\`\`\`

### Frontend (.env)
\`\`\`env
REACT_APP_API_URL=http://localhost:8080/api
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

## 📱 Usage

### For Donors:
1. Register/Login as a Donor
2. Schedule pickup requests
3. Track pickup status
4. View environmental impact

### For Collectors:
1. Register/Login as a Collector
2. View available pickups nearby
3. Accept pickup requests
4. Update pickup status
5. Track earnings

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Pickups
- `POST /api/pickups` - Schedule pickup (Donors only)
- `GET /api/pickups/user` - Get user's pickups
- `GET /api/pickups/available` - Get available pickups (Collectors only)
- `PUT /api/pickups/{id}/accept` - Accept pickup (Collectors only)
- `PUT /api/pickups/{id}/status` - Update pickup status (Collectors only)

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/{id}/read` - Mark notification as read
- `GET /api/notifications/unread-count` - Get unread count

## 🧪 Testing

### Sample Login Credentials
<<<<<<< HEAD
```
=======
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
Donor Account:
Email: john@example.com
Password: password

Collector Account:
Email: jane@example.com
Password: password
<<<<<<< HEAD
```

### API Testing with cURL
```bash
=======
\`\`\`

### API Testing with cURL
\`\`\`bash
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
# Register new user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "DONOR",
    "location": {
      "address": "Test Address",
      "latitude": 19.0760,
      "longitude": 72.8777
    }
  }'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
<<<<<<< HEAD
```
=======
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

## 🚀 Deployment

### Production Build
<<<<<<< HEAD
```bash
=======
\`\`\`bash
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
# Frontend
npm run build

# Backend
mvn clean package -DskipTests
java -jar target/waste-management-backend-0.0.1-SNAPSHOT.jar
<<<<<<< HEAD
```

### Environment Variables for Production
```bash
=======
\`\`\`

### Environment Variables for Production
\`\`\`bash
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
export SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/waste_management_db
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password
export JWT_SECRET=your_secure_secret_key
<<<<<<< HEAD
```
=======
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

<<<<<<< HEAD
For support, email harshdubey1011@gmail.com or create an issue in the repository.
=======
For support, email support@bintobloom.com or create an issue in the repository.
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

---

**BinToBloom** - Making the world greener, one pickup at a time! 🌱
<<<<<<< HEAD
=======
\`\`\`
\`\`\`
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83

## 🎉 **Complete Full-Stack Application Ready!**

You now have the complete **BinToBloom** waste management platform with:

✅ **React Frontend** with Redux, TypeScript, and Tailwind CSS  
✅ **Spring Boot Backend** with JWT authentication and MySQL  
✅ **Database Schema** with sample data  
✅ **Docker Setup** for easy deployment  
✅ **Complete API Integration** between frontend and backend  
✅ **Location-based Services** for pickup matching  
✅ **Real-time Notifications** system  
✅ **Role-based Access Control** (Donor/Collector)  

### **Quick Start:**
1. **Setup Database:** Run the SQL files to create tables
2. **Start Backend:** `mvn spring-boot:run` (port 8080)
3. **Start Frontend:** `npm start` (port 3000)
4. **Test:** Use sample credentials to login and test features

The application is production-ready with proper security, error handling, and responsive design! 🚀
"# BinToBloom" 
<<<<<<< HEAD
=======
=======
# 🌱 BinToBloom

BinToBloom is a 3D-powered interactive platform designed to connect waste contributors with collectors and promote sustainable living. Built using **React**, **Three.js**, and **Zustand**.

---

## 🚀 Getting Started

To run the project locally:

# 1. Clone the repository
```bash
git clone https://github.com/hanz7860/BinToBloom.git
```
# 2. Go to the project directory
```bash
cd BinToBloom
```
# 3. Install dependencies
```bash
npm install
```
# 4. Start the development server
```bash
npm run dev
```

# 5. Go to localhost
```bash
http://localhost:3000
```
>>>>>>> 821ad8e3403df0274503f1568fa817ddb0fbdfa7
>>>>>>> 329ba18f900950419c16c4e849601e49a8284c83
