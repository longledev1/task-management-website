# 📝 Todo App

A feature-rich **Todo Management Application** built with **ReactJS**, designed to help users manage their daily tasks efficiently with filters, categories, tags, and sorting options.
This project emphasizes clean UI, reusable components, and centralized state management using Context API.

## 🚀 Features

### ✅ Core
- ✨ CRUD operations: Create, Read, Update, Delete todos.
- ✅ Mark as completed or important.
- 🔑 Unique ID generation with `crypto.randomUUID()`.

### 🔍 Filtering & Sorting
- 🔍 Search by name.
- 📂 Filter by category.
- 🏷️ Filter by tags.
- ↕️ Sort todos (by importance, completion status, creation date, etc.).

### 📁 Organization
- 📂 Categories: group tasks into folders.
- 🏷️ Tags: add custom labels for better organization.

### 💡 User Experience
- 🔔 Notifications with **React Toastify**.
- 🎨 **React Icons** for intuitive UI elements.
- 📱 Responsive design for mobile and desktop.
- 💾 Data persistence using **useLocalStorage** from `usehooks-ts`.
- ⚡ Centralized state management with **Context API**.

## 🛠️ Tech Stack
- ⚛️ **ReactJS** (Hooks, functional components).
- 🎨 **CSS + Tailwind** (if applied) for styling.
- 🔔 **React Toastify** (toast notifications).
- 🎨 **React Icons** (icon library).
- 💾 **useLocalStorage (usehooks-ts)** (local storage persistence).
- 🌐 **Context API** (global state management).
- 🔑 **crypto.randomUUID()** for unique task IDs.

#### 🎯 Future Improvements
- 🔒 Integration with backend (Supabase/Firebase) for multi-device sync.
- 🌙 Dark mode support.
- 📅 Due date & reminders with calendar view.
- 👥 Multi-user support with authentication.


---

## 🚦 Getting Started

Follow these steps to set up the project locally:

### 1️⃣ Prerequisites
- Install [**Node.js**](https://nodejs.org/) (v16+ recommended).
- Install **npm** or **yarn** as your package manager.

### 2️⃣ Installation
Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/your-username/todo-app.git

# Navigate to project folder
cd todo-app

# Install dependencies
npm install
# or
yarn install
