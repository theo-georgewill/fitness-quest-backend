# Fitness Quest – Backend

A **full-stack JavaScript fitness application** backend built with **Express**, **TypeScript**, and **Prisma ORM**.
This backend manages workout programs, daily workouts, and user enrollments, serving data to the Fitness Quest frontend.

---

## 📂 Project Structure

```
src/
 ├── controllers/
 │    ├── programController.ts
 │    ├── programDayController.ts
 │    ├── exerciseController.ts
 │    ├── workoutController.ts
 │    ├── enrollmentController.ts
 │    └── logController.ts
 │
 ├── routes/
 │    ├── programRoutes.ts
 │    ├── programDayRoutes.ts
 │    ├── exerciseRoutes.ts
 │    ├── workoutRoutes.ts
 │    ├── enrollmentRoutes.ts
 │    └── logRoutes.ts
 │
 ├── prisma/
 │    └── client.ts
 │
 ├── middlewares/
 │    └── authMiddleware.ts
 │
 ├── types/
 │    └── index.d.ts
 │
 ├── app.ts
 └── server.ts
 └── README.md

```
---
## 🚀 Tech Stack

* **Language**: TypeScript
* **Framework**: Express.js
* **Database ORM**: Prisma
* **Database**: PostgreSQL (or any Prisma-supported DB)
* **Dev Tools**: Nodemon, ts-node, dotenv

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/theo-georgewill/fitness-quest-backend.git
cd fitness-quest-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/fitness_quest"
PORT=5000
```

### 4. Run Prisma Migrations

```bash
npx prisma migrate dev --name init
```

### 5. Seed the Database (optional)

```bash
npm run seed
```

### 6. Start the Development Server

```bash
npm run dev
```

---

## 📌 API Endpoints

| Method | Endpoint                  | Description                    |
| ------ | ------------------------- | ------------------------------ |
| GET    | `/workouts/today/:userId` | Get today's workout for a user |
| POST   | `/users`                  | Create a new user              |
| POST   | `/enrollments`            | Enroll a user in a program     |

---

## 📖 How It Works


1. **User signs up** (frontend handles auth, backend stores user).
2. **User enrolls** in a fitness program.
3. **User fetches today's workout** using `/workouts/today/:userId`.
4. Backend fetches data from the database using **Prisma**, returning the program day and exercises.

---

## 🛠 Development Scripts

```bash
npm run dev       # Start server in dev mode
npm run build     # Compile TypeScript to JS
npm start         # Run compiled code
```

---

## 🧪 Testing

```bash
# (add Jest or Supertest for API tests)
npm run test
```

---

## 📜 License

MIT License.
