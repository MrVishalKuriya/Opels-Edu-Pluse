<div align="center">

<img src="frontend/Pasted image.png" alt="Opels Logo" width="120" height="120"/>

# 🎓 Opels Edu-Pluse

### *Enterprise College Student Management Portal*

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://college-student-management-rkxi.vercel.app)
[![Backend API](https://img.shields.io/badge/⚙️_Backend_API-Render-46E3B7?style=for-the-badge&logo=render)](https://college-student-management.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Opels--Edu--Pluse-181717?style=for-the-badge&logo=github)](https://github.com/MrVishalKuriya/Opels-Edu-Pluse)

![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.3.4-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-336791?style=flat-square&logo=postgresql&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat-square&logo=openjdk&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-007fff?style=flat-square)

<br/>

> **Opels Edu-Pluse** is a full-stack, enterprise-grade Education Management System built with  
> ⚡ Spring Boot REST API · ⚛️ React SPA · 🐘 Supabase PostgreSQL · 🚀 Deployed on Render + Vercel

---

</div>

## 📸 Preview

<div align="center">

| 🏠 Landing Page | 📊 Dashboard | 👨‍🎓 Student Portal |
|:---:|:---:|:---:|
| Company-branded hero section with live stats | Real-time KPI cards & analytics | Full CRUD student management table |

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎓 Student Management
- ✅ Add, Edit, View, Delete students
- ✅ Live search & filter by course / semester
- ✅ GPA, Attendance, Fee Status tracking
- ✅ Student ID card generation
- ✅ One-click CSV export

</td>
<td width="50%">

### 👨‍🏫 Faculty & Notices
- ✅ Faculty directory with profiles
- ✅ Add / Remove faculty members
- ✅ Notice board with announcements
- ✅ Course schedule & timetable view
- ✅ Role-based access (Admin / Faculty / Student)

</td>
</tr>
<tr>
<td width="50%">

### 🎨 UI / UX
- ✅ Opels brand theme (Electric Blue `#007fff`)
- ✅ Dark / Light mode toggle
- ✅ Fully responsive — Mobile, Tablet, Desktop
- ✅ Glassmorphism cards & animations
- ✅ Toast notifications system

</td>
<td width="50%">

### ☁️ Cloud & Infrastructure
- ✅ Spring Boot REST API on **Render**
- ✅ React frontend on **Vercel**
- ✅ PostgreSQL database on **Supabase**
- ✅ CORS configured for cross-origin requests
- ✅ Environment-based configuration

</td>
</tr>
</table>

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    OPELS EDU-PLUSE                       │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   ┌──────────────────┐        ┌──────────────────────┐  │
│   │   React + Vite   │◄──────►│  Spring Boot REST API │  │
│   │   (Vercel CDN)   │  CORS  │    (Render Cloud)     │  │
│   │                  │        │                       │  │
│   │  • Landing Page  │        │  • /api/students      │  │
│   │  • Dashboard     │        │  • /api/faculty       │  │
│   │  • Student Table │        │  • /api/notices       │  │
│   │  • Faculty Dir   │        │  • /api/students/stats│  │
│   └──────────────────┘        └──────────┬────────────┘  │
│                                          │               │
│                               ┌──────────▼────────────┐  │
│                               │  Supabase PostgreSQL   │  │
│                               │   (Online Database)    │  │
│                               │                       │  │
│                               │  students / faculty   │  │
│                               │  notices / schedules  │  │
│                               └───────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Version |
|:---:|:---:|:---:|
| **Frontend** | React + Vite | 18 / 5.x |
| **Styling** | Vanilla CSS + Lucide Icons | — |
| **Backend** | Spring Boot | 3.3.4 |
| **Language** | Java | 17 |
| **Database** | PostgreSQL (Supabase) | 15 |
| **ORM** | Spring Data JPA + Hibernate | 6.x |
| **Build** | Maven | 3.x |
| **Frontend Deploy** | Vercel | — |
| **Backend Deploy** | Render | — |

</div>

---

## 🚀 Getting Started

### Prerequisites

```bash
☑  Java 17+
☑  Node.js 18+
☑  Maven 3.8+
```

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MrVishalKuriya/Opels-Edu-Pluse.git
cd Opels-Edu-Pluse
```

### 2️⃣ Run the Frontend (React)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 3️⃣ Run the Backend (Spring Boot)

```bash
# From project root
./mvnw spring-boot:run
# → http://localhost:8080
```

> 💡 **Default**: Uses H2 in-memory database locally. No setup needed!

### 4️⃣ Configure Environment (Optional — for PostgreSQL)

Create `frontend/.env`:

```env
VITE_API_URL=https://college-student-management.onrender.com/api
```

Set these on Render (Environment Variables):

```env
SPRING_DATASOURCE_URL=jdbc:postgresql://db.xxxx.supabase.co:5432/postgres
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=your-supabase-password
SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
```

---

## 📁 Project Structure

```
Opels-Edu-Pluse/
│
├── 📂 frontend/                    # React + Vite SPA
│   ├── 📂 src/
│   │   ├── 📂 components/          # UI Components
│   │   │   ├── Header.jsx          # Navigation + Logo
│   │   │   ├── Dashboard.jsx       # KPI Cards
│   │   │   ├── StudentTable.jsx    # CRUD Table
│   │   │   ├── StudentModal.jsx    # Add/Edit Form
│   │   │   ├── FacultyDirectory.jsx
│   │   │   ├── NoticeBoard.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   └── LoginModal.jsx
│   │   ├── 📂 services/
│   │   │   └── api.js              # REST API client
│   │   ├── App.jsx                 # Root component
│   │   └── index.css               # Opels brand styles
│   └── .env                        # Frontend env config
│
├── 📂 src/main/java/com/college/backend/
│   ├── 📂 controller/              # REST Controllers
│   │   ├── StudentController.java
│   │   ├── FacultyController.java
│   │   └── NoticeController.java
│   ├── 📂 entity/                  # JPA Entities
│   ├── 📂 repository/              # Spring Data Repos
│   ├── 📂 service/                 # Business Logic
│   └── 📂 config/
│       ├── WebConfig.java          # CORS Config
│       └── DataInitializer.java    # Sample data seeder
│
├── 📂 src/main/resources/
│   ├── application.properties      # App config
│   └── 📂 static/                  # Built React SPA
│
├── Dockerfile                      # Docker container config
├── pom.xml                         # Maven dependencies
└── README.md
```

---

## 🌐 Deployment

<div align="center">

| Service | Platform | URL |
|:---:|:---:|:---:|
| 🖥️ **Frontend** | Vercel | [college-student-management-rkxi.vercel.app](https://college-student-management-rkxi.vercel.app) |
| ⚙️ **Backend API** | Render | [college-student-management.onrender.com](https://college-student-management.onrender.com) |
| 🐘 **Database** | Supabase PostgreSQL | Private |

</div>

### Docker Deployment

```bash
# Build image
docker build -t opels-edu-pluse .

# Run container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://... \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=yourpassword \
  opels-edu-pluse
```

---

## 🔌 API Endpoints

<div align="center">

| Method | Endpoint | Description |
|:---:|:---|:---|
| `GET` | `/api/students` | Get all students |
| `POST` | `/api/students` | Create new student |
| `PUT` | `/api/students/{id}` | Update student |
| `DELETE` | `/api/students/{id}` | Delete student |
| `GET` | `/api/students/stats` | Get statistics |
| `GET` | `/api/students/search?query=` | Search students |
| `GET` | `/api/faculty` | Get all faculty |
| `POST` | `/api/faculty` | Add faculty member |
| `DELETE` | `/api/faculty/{id}` | Remove faculty |
| `GET` | `/api/notices` | Get all notices |
| `POST` | `/api/notices` | Post new notice |
| `DELETE` | `/api/notices/{id}` | Delete notice |

</div>

---

## 👨‍💼 Author

<div align="center">

<img src="https://avatars.githubusercontent.com/u/MrVishalKuriya" width="80" style="border-radius:50%"/>

**Vishal Pravinbhai Kuriya**  
*Full Stack Developer @ Opels*

[![GitHub](https://img.shields.io/badge/GitHub-MrVishalKuriya-181717?style=flat-square&logo=github)](https://github.com/MrVishalKuriya)
[![Company](https://img.shields.io/badge/Company-Opels-007fff?style=flat-square&logo=google-chrome&logoColor=white)](https://opels.co.in)

</div>

---

<div align="center">

**Made with ❤️ by [Opels](https://opels.co.in)**

*© 2026 Opels Edu-Pluse. All Rights Reserved.*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=MrVishalKuriya.Opels-Edu-Pluse)

</div>
