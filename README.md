# 💬 WhatsApp Mini-Clone (CRUD App)

A full-stack chat management application built with **Node.js**, **Express**, and **MongoDB**. This project demonstrates complete CRUD (Create, Read, Update, Delete) functionality with a focus on backend data persistence and server-side rendering.

---

## 🚀 Features

* **View All Chats**: Real-time fetching and display of chat logs from MongoDB.
* **Start New Conversations**: Dedicated form to initialize new chat records.
* **Edit Messages**: Ability to update existing messages with automatic `updatedAt` timestamps.
* **Safe Deletion**: Integrated JavaScript confirmation pop-ups to prevent accidental deletions.
* **Responsive UI**: A clean, modern interface inspired by WhatsApp, styled with custom CSS.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Frontend**: EJS (Embedded JavaScript), CSS3
* **Middleware**: Method-Override (for PUT/DELETE requests), Express.urlencoded

## ⚙️ Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Database Configuration**:
    Ensure you have MongoDB installed and running locally on `mongodb://127.0.0.1:27017/whatsapp`.
4.  **Run the Server**:
    ```bash
    node index.js
    ```
5.  **Access the App**:
    Open [http://localhost:8080/chats](http://localhost:8080/chats) in your browser.

---

## 📂 Project Structure

* `index.js`: The main entry point and server logic.
* `Models/`: Contains the Mongoose `Chat` schema.
* `views/`: EJS templates for the Index, New, and Edit pages.
* `public/`: Static files (CSS).

---

### 📝 Future Improvements
* [ ] Integration of React.js for the frontend (MERN stack transition).
* [ ] User authentication (Login/Signup).
* [ ] Search functionality to filter chats by sender.
