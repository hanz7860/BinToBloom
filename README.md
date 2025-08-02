# BinToBloom - Waste Management Platform

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
\`\`\`bash
git clone <repository-url>
cd waste-management-platform
\`\`\`

### 2. Database Setup
\`\`\`bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE waste_management_db;

# Run schema and sample data
mysql -u root -p waste_management_db < database/schema.sql
mysql -u root -p waste_management_db < database/sample_data.sql
\`\`\`

### 3. Backend Setup
\`\`\`bash
cd backend
mvn clean install
mvn spring-boot:run
\`\`\`

The backend will start on `http://localhost:8080`

### 4. Frontend Setup
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm start
\`\`\`

The frontend will start on `http://localhost:3000`

### 5. Using Docker (Alternative)
\`\`\`bash
# Build and run with Docker Compose
docker-compose up --build
\`\`\`

## 🔑 Environment Variables

### Backend (application.properties)
\`\`\`properties
spring.datasource.url=jdbc:mysql://localhost:3306/waste_management_db
spring.datasource.username=root
spring.datasource.password=your_password
jwt.secret=your_jwt_secret_key
cors.allowed-origins=http://localhost:3000
\`\`\`

### Frontend (.env)
\`\`\`env
REACT_APP_API_URL=http://localhost:8080/api
\`\`\`

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
\`\`\`
Donor Account:
Email: john@example.com
Password: password

Collector Account:
Email: jane@example.com
Password: password
\`\`\`

### API Testing with cURL
\`\`\`bash
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
\`\`\`

## 🚀 Deployment

### Production Build
\`\`\`bash
# Frontend
npm run build

# Backend
mvn clean package -DskipTests
java -jar target/waste-management-backend-0.0.1-SNAPSHOT.jar
\`\`\`

### Environment Variables for Production
\`\`\`bash
export SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/waste_management_db
export SPRING_DATASOURCE_USERNAME=your_username
export SPRING_DATASOURCE_PASSWORD=your_password
export JWT_SECRET=your_secure_secret_key
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@bintobloom.com or create an issue in the repository.

---

**BinToBloom** - Making the world greener, one pickup at a time! 🌱
\`\`\`
\`\`\`

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
