-- Create database
CREATE DATABASE IF NOT EXISTS waste_management_db;
USE waste_management_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('DONOR', 'COLLECTOR') NOT NULL,
    latitude DOUBLE,
    longitude DOUBLE,
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_location (latitude, longitude)
);

-- Pickups table
CREATE TABLE IF NOT EXISTS pickups (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    donor_id BIGINT NOT NULL,
    collector_id BIGINT,
    waste_type VARCHAR(100) NOT NULL,
    quantity DOUBLE NOT NULL,
    pickup_latitude DOUBLE NOT NULL,
    pickup_longitude DOUBLE NOT NULL,
    pickup_address TEXT NOT NULL,
    scheduled_time TIMESTAMP NOT NULL,
    status ENUM('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (collector_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_donor (donor_id),
    INDEX idx_collector (collector_id),
    INDEX idx_status (status),
    INDEX idx_location (pickup_latitude, pickup_longitude),
    INDEX idx_scheduled_time (scheduled_time)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('PICKUP_REQUEST', 'PICKUP_ACCEPTED', 'PICKUP_COMPLETED', 'GENERAL') NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    pickup_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (pickup_id) REFERENCES pickups(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_read (is_read),
    INDEX idx_created_at (created_at)
);
