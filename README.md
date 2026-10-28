# Simple To-Do App (Backend Only)

একটি সাধারণ To-Do App-এর Backend REST API যা Node.js, Express.js, MongoDB এবং Mongoose দিয়ে তৈরি করা হয়েছে।

---

## 🚀 ফিচারসমূহ (Features)
- নতুন Task তৈরি করা (POST `/todos`)
- সকল Task দেখা (GET `/todos`)
- নির্দিষ্ট Task দেখা (GET `/todos/:id`)
- Task আপডেট করা (PUT `/todos/:id`)
- Task ডিলিট করা (DELETE `/todos/:id`)
- MongoDB Mongoose Validation & ObjectId Error Handling
- Postman Collection ready for 1-click testing

---

## 📁 প্রজেক্ট স্ট্রাকচার (Project Structure)
```
├── config/
│   └── db.js               # MongoDB সংযোগ লজিক
├── controllers/
│   └── todoController.js   # CRUD অপারেশন ও ভ্যালিডেশন
├── models/
│   └── Todo.js             # Mongoose Schema ও Model
├── routes/
│   └── todoRoutes.js       # To-Do API রাউটসমূহ
├── .env                    # এনভায়রনমেন্ট ভ্যারিয়েবল (PORT ও MONGO_URI)
├── .env.example            # এনভায়রনমেন্ট ভ্যারিয়েবলের উদাহরণ
├── .gitignore              # Git ignore ফাইল
├── package.json            # ডিপেন্ডেন্সি ও স্ক্রিপ্ট
├── server.js               # মূল সার্ভার ফাইল
└── postman_collection.json # Postman কালেকশন ফাইল
```

---

## ⚙️ ইনস্টলেশন ও সেটআপ (Setup & Installation)

### ১. ডিপেন্ডেন্সি ইনস্টল করুন:
```bash
npm install
```

### ২. এনভায়রনমেন্ট কনফিগারেশন (`.env`):
`.env` ফাইলে আপনার MongoDB কানেকশন স্ট্রিং সেট করুন:
```env
PORT=5000
# লোকাল MongoDB অথবা MongoDB Atlas URI
MONGO_URI=mongodb://127.0.0.1:27017/todo-app-db
```
*(MongoDB Atlas ব্যবহার করলে Atlas থেকে পাওয়া Connection URI টি এখানে বসান)*

### ৩. সার্ভার রান করুন:
* ডেভেলপমেন্ট মোডে রান করতে:
```bash
npm run dev
```
* সাধারণ প্রোডাকশন মোডে রান করতে:
```bash
npm start
```

সার্ভার সফলভাবে চালু হলে কনসোলে দেখাবে:
```
🚀 Server is running on port 5000
✅ MongoDB Connected: ...
```

---

## 📡 API Endpoints

### ১. নতুন Task তৈরি (Create Task)
- **Method**: `POST`
- **URL**: `http://localhost:5000/todos`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "title": "Complete Module 15 Assignment",
  "description": "Build Express and MongoDB Backend with CRUD APIs",
  "completed": false
}
```
- **Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "67201b...",
    "title": "Complete Module 15 Assignment",
    "description": "Build Express and MongoDB Backend with CRUD APIs",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### ২. সকল Task দেখা (Get All Tasks)
- **Method**: `GET`
- **URL**: `http://localhost:5000/todos`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "67201b...",
      "title": "Complete Module 15 Assignment",
      "description": "Build Express and MongoDB Backend with CRUD APIs",
      "completed": false,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### ৩. নির্দিষ্ট Task দেখা (Get Task by ID)
- **Method**: `GET`
- **URL**: `http://localhost:5000/todos/:id`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "data": {
    "_id": "67201b...",
    "title": "Complete Module 15 Assignment",
    "description": "Build Express and MongoDB Backend with CRUD APIs",
    "completed": false,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### ৪. Task আপডেট করা (Update Task)
- **Method**: `PUT`
- **URL**: `http://localhost:5000/todos/:id`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
```json
{
  "title": "Complete Module 15 Assignment (Done)",
  "completed": true
}
```
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "67201b...",
    "title": "Complete Module 15 Assignment (Done)",
    "description": "Build Express and MongoDB Backend with CRUD APIs",
    "completed": true,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### ৫. Task ডিলিট করা (Delete Task)
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/todos/:id`
- **Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "67201b...",
    "title": "Complete Module 15 Assignment (Done)",
    "description": "Build Express and MongoDB Backend with CRUD APIs",
    "completed": true
  }
}
```

---

## 📮 Postman দিয়ে পরীক্ষা করার নিয়ম

1. **Postman ওপেন করুন**।
2. উপরে বামপাশে থাকা **"Import"** বাটনে ক্লিক করুন।
3. প্রজেক্ট ফোল্ডারে থাকা **`postman_collection.json`** ফাইলটি সিলেক্ট করে ইমপোর্ট করুন।
4. কালেকশনে নিচের রিকোয়েস্টগুলো রেডি পাবেন:
   - `0. Health Check & Welcome`
   - `1. Create Task (POST /todos)`
   - `2. Get All Tasks (GET /todos)`
   - `3. Get Task by ID (GET /todos/:id)`
   - `4. Update Task (PUT /todos/:id)`
   - `5. Delete Task (DELETE /todos/:id)`
5. `POST /todos` রান করার পর যে `_id` পাবেন, সেটি কালেকশনের `todo_id` ভ্যারিয়েবলে বা সরাসরি URL-এ পেস্ট করে GET, PUT ও DELETE টেস্ট করতে পারবেন।
