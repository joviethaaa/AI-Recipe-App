## About the Project

AI Recipe App is a cross-platform recipe discovery application built with React Native and Expo.

The application integrates recipe data from TheMealDB, a Node.js and Express backend, PostgreSQL with Drizzle ORM, and a Python machine learning model for meal classification.

The project was developed as a group Artificial Intelligence course project.

---

## App Preview

<p align="center">
  <img src="docs/screenshots/home.png" width="900" alt="Home Screen" />
</p>

### Search

<p align="center">
  <img src="docs/screenshots/search.png" width="900" alt="Search Screen" />
</p>

### Favorites

<p align="center">
  <img src="docs/screenshots/favorites.png" width="900" alt="Favorites Screen" />
</p>

### Calendar

<p align="center">
  <img src="docs/screenshots/calendar.png" width="900" alt="Calendar Screen" />
</p>

## Features

- Recipe discovery
- Search recipes by name
- Filter recipes by category
- View recipe details
- Save favorite recipes
- Remove favorite recipes
- Store favorites in PostgreSQL
- AI-based meal classification
- Personalized meal planning interface
- Cross-platform support with Expo

---

## Tech Stack

### Mobile
- React Native
- Expo
- Expo Router
- Axios

### Backend
- Node.js
- Express.js
- Python Shell

### Database
- PostgreSQL
- Neon
- Drizzle ORM

### Machine Learning
- Python
- Pandas
- Scikit-learn
- Joblib

### External API
- TheMealDB

---
## How to Run the Project

### 1. Clone Repository

```bash
git clone https://github.com/joviethaaa/AI-Recipe-App.git
cd AI-Recipe-App
```

### 2. Run Backend

Masuk ke folder backend:

```bash
cd backend
```

Install dependency Node.js:

```bash
npm install
```

Install dependency Python:

```bash
pip install -r ml/requirements.txt
```

Buat file `.env` berdasarkan `.env.example`.

Contoh isi:

```env
PORT=5001
DATABASE_URL=your_neon_database_connection_string
NODE_ENV=development
API_URL=http://localhost:5001/api/health
```

Jalankan backend:

```bash
npm run dev
```

Backend akan berjalan di:

```text
http://localhost:5001
```

Untuk mengecek backend:

```text
http://localhost:5001/api/health
```

Jika berhasil, endpoint health check akan mengembalikan response sukses.

---

### 3. Run Mobile / Web App

Buka terminal baru.

Masuk ke folder mobile:

```bash
cd mobile
```

Install dependency:

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`.

Contoh isi:

```env
EXPO_PUBLIC_API_URL=http://localhost:5001
```

Jalankan Expo:

```bash
npx expo start
```

Untuk membuka versi web, tekan:

```text
w
```

atau jalankan langsung:

```bash
npx expo start --web
```

Web app biasanya dapat diakses melalui:

```text
http://localhost:8081
```

---

### 4. Main API Endpoints

```text
GET    /api/health
POST   /api/favorites
GET    /api/favorites/:userId
DELETE /api/favorites/:userId/:recipeId
POST   /predict
```

### 5. Important Notes

- Pastikan backend sudah berjalan sebelum membuka aplikasi.
- File `.env` tidak disimpan di repository.
- Gunakan `.env.example` sebagai template konfigurasi.
- Koneksi database menggunakan PostgreSQL melalui Neon.
- Data resep diambil dari TheMealDB.
- Fitur machine learning menggunakan model Python di folder `backend/ml`.

## Project Architecture

```text
                TheMealDB API
                     │
                     ▼
             React Native / Expo
                     │
                     ▼
             Node.js + Express
                │           │
                ▼           ▼
             Neon DB     Python ML
                            │
                            ▼
                   meal_classifier.pkl
