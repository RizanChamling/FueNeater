-- Database Schema for FurNeater

CREATE DATABASE IF NOT EXISTS FurNeater;
USE FurNeater;

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- 3. Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- 4. Customization Options table
CREATE TABLE IF NOT EXISTS customization_options (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    type ENUM('dimension', 'color', 'material') NOT NULL,
    label VARCHAR(255) NOT NULL,
    extra_price DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 5. Orders table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Order Items table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL DEFAULT 1,
    custom_dimensions VARCHAR(255), -- Format: "HxWxD"
    selected_material VARCHAR(255),
    selected_color VARCHAR(255),
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- 7. Seed Categories
INSERT IGNORE INTO categories (name) VALUES ('Sofas'), ('Chairs'), ('Tables'), ('Storage'), ('Lighting'), ('Desks');

-- 8. Seed Products (Readymade and Custom Base Models)
INSERT IGNORE INTO products (id, name, description, base_price, category_id, image_url, stock) VALUES 
(1, 'Velvet Cloud Sofa', 'Readymade luxury sofa', 1290.00, 1, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', 14),
(2, 'Minimalist Dining Set', 'Readymade dining room centerpiece', 849.00, 3, 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc', 8),
(3, 'Oak Reading Chair', 'Readymade comfortable reading chair', 320.00, 2, 'https://images.unsplash.com/photo-1592078615290-033ee584e267', 22),
(4, 'Archway Bookshelf', 'Readymade architectural storage', 450.00, 4, 'https://images.unsplash.com/photo-1594620302200-9a762244a156', 5),
(5, 'Lumiere Floor Lamp', 'Readymade ambient lighting', 180.00, 5, 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15', 30),
(6, 'Walnut Coffee Table', 'Readymade center table', 290.00, 3, 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc', 2),
(100, 'Custom Minimalist Desk', 'Fully customizable base frame', 450.00, 6, '', 999);
