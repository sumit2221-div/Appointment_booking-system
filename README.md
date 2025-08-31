# 📅 Appointment Booking API

A simple appointment booking system built with **Node.js**, **Express**, and **MongoDB**.  
It allows students to book appointments with professors, and professors to manage their availability.

---

## 🚀 Features

- 👨‍🎓 **Students**
  - Book an appointment with a professor
  - View their own appointments

- 👨‍🏫 **Professors**
  - Add available time slots
  - View all their appointments
  - Cancel an appointment

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (`student`, `professor`)

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JSON Web Token (JWT)  
- **Testing:** Jest + Supertest  

---

## 📂 Project Structure

├── controller
│ └── Appointment.Controller.js
├── middleware
│ └── auth.middleware.js
├── model
│ └── Appointment.model.js
├── routes
│ └── Appointment.routes.js
├── test
│ └── appointment.test.js
└── server.js


---

## 📌 API Endpoints

### **Student Routes**
- `POST /api/appointment/:availabilityId` → Book an appointment  
- `GET /api/appointment` → Get my appointments (only student can see their own)

### **Professor Routes**
- `POST /api/availability` → Add availability  
- `GET /api/appointment` → Get my appointments  
- `DELETE /api/appointment/:appointmentId` → Cancel an appointment  

---

## 🔑 Authentication

- Each request must include a **JWT token** in headers:  

```http
Authorization: Bearer <token>


Getting Started

Clone this repository:

git clone https://github.com/your-username/appointment-api.git
cd appointment-api


Install dependencies:

npm install


Setup environment variables (.env):

MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000


Run the server:

npm run dev


Run tests:

npm test

✅ Example Flow

Professor adds availability

Student books an appointment using that availability

Student can view their appointments

Professor can cancel the appointment if needed

👨‍💻 Author

Sumit Sonar
📧 Email: [your-email@example.com
]
