# FurNeater Backend Planning

This document outlines the backend architecture, database schema, and API routes for FurNeater, a full-stack furniture customization and e-commerce platform.

## 1. Project Overview
- **Core Technology:** Node.js, Express.js
- **Database:** SQL (MySQL)
- **Architecture:** Controller-Service-Model pattern

## 2. Database Schema (SQL)
The database will utilize relational tables to manage users, products, customizations, and orders.

### Tables:
- **`users`**: Stores user information and roles.
  - `id` (PK), `username`, `email`, `password_hash`, `role` (user/admin), `created_at`
- **`categories`**: Product categories (e.g., Sofa, Chair, Table).
  - `id` (PK), `name`
- **`products`**: Base furniture products.
  - `id` (PK), `name`, `description`, `base_price`, `category_id` (FK), `image_url`, `stock`
- **`customization_options`**: Available customization types for products.
  - `id` (PK), `product_id` (FK), `type` (dimension/color/material), `label`, `extra_price`
- **`orders`**: Customer orders.
  - `id` (PK), `user_id` (FK), `total_amount`, `status` (pending/paid/shipped/delivered), `created_at`
- **`order_items`**: Individual items within an order, including customization details.
  - `id` (PK), `order_id` (FK), `product_id` (FK), `quantity`, `custom_dimensions` (H x W x D), `selected_material`, `selected_color`, `subtotal`

## 3. API Routes Structure
Following the current project structure in `src/routes/`:

### Auth Routes (`/api/auth`)
- `POST /register`: User registration.
- `POST /login`: User authentication & JWT generation.

### Product Routes (`/api/products`)
- `GET /`: Fetch all products (with optional category filtering).
- `GET /:id`: Fetch detailed product info including customization options.

### Cart & Order Routes (`/api/orders`)
- `POST /`: Create a new order (Checkout).
- `GET /`: Fetch orders for the logged-in user.
- `GET /:id`: Fetch specific order details.

### Admin Routes (`/api/admin`)
- `GET /orders`: View all customer orders.
- `PUT /orders/:id`: Update order status.
- `POST /products`: Add new base products.
- `PUT /products/:id`: Update product details/inventory.

## 4. Backend Architecture
The logic will be divided into three main layers:
1.  **Controllers**: Handle HTTP requests, validate input, and call services.
2.  **Services**: Contain business logic (e.g., calculating price with customizations, order processing).
3.  **Models**: Interact directly with the MySQL database using the `db.js` config.

## 5. Development Roadmap
1.  **Phase 1: Database Setup**: Initialize MySQL tables based on the schema.
2.  **Phase 2: Authentication**: Implement JWT-based auth and user services.
3.  **Phase 3: Product Management**: Build routes to serve product and customization data.
4.  **Phase 4: Order System**: Implement checkout logic and order tracking.
5.  **Phase 5: Admin Dashboard**: Build secure admin-only endpoints for management.
