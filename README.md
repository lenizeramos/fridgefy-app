> **Note:** This repository is a personal backup of coursework originally developed as part of my studies at Cornerstone College. It was cloned from a institutional and private repository to preserve my contributions and development history.

# Fridgefy

Welcome to **Fridgefy**!  
Fridgefy is a full-stack web application built using **React.js**, **Node.js**, **TypeScript**, and **Prisma**. It allows users to store their personal recipes and fridge ingredients, search for recipes, and manage shopping lists.

## ✨ Features

### All Users
- Search for recipes using the [DummyJSON API](https://dummyjson.com/recipes).

### Registered Users Only
- Add ingredients to the fridge
- Add recipes to a wishlist
- Generate shopping lists based on selected recipes
- Filter recipes based on fridge ingredients

## 📄 Pages
- Home / Hero page
- Recipes page with filters
- Wishlist & Shopping list page

## 🚀 Stack and Tools Used

### 🔧 Frontend
- React 18
- Vite
- TypeScript
- React Router DOM
- Clerk for authentication
- Bootstrap 5 + React Bootstrap
- Sass
- React Hot Toast

### 🧠 Backend
- Node.js with Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Clerk Express middleware
- dotenv for env variables
- EJS

### 🧪 Dev Tools & Scripts
- ESLint + plugins (React Hooks, Refresh)
- Sass watcher and TypeScript compiler
- ts-node-dev for hot reload in development

### 🧠 AI Integration
- LangChain + OpenAI for recipes

## 🗂 Services & Integrations
- DummyJSON API for recipes
- PostgreSQL
- Clerk for auth

## 🎁 Features
- Advanced filtering (by cuisine, etc.)
- Remove shopping list items if already in fridge

## 🛠 Setup Instructions

1. Clone the repo
2. Setup `.env` files for frontend and backend and **DO NOT** push them to GitHub
3. Run backend with:
```bash
npm install
npm run dev
```
4. Run frontend with:
```bash
npm install
npm run dev
```
