-- Create database and user for BinToBloom
CREATE DATABASE IF NOT EXISTS bintobloom;
CREATE USER IF NOT EXISTS 'bintobloom_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON bintobloom.* TO 'bintobloom_user'@'localhost';
FLUSH PRIVILEGES;

USE bintobloom;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    user_type ENUM('HOUSEHOLD', 'RESTAURANT', 'COLLECTOR', 'NGO') NOT NULL,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    eco_points INT DEFAULT 0,
    total_waste_collected DECIMAL(10,2) DEFAULT 0.00,
    total_co2_saved DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_user_type (user_type),
    INDEX idx_status (status)
);

-- Create pickups table
CREATE TABLE IF NOT EXISTS pickups (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    donor_id BIGINT NOT NULL,
    collector_id BIGINT NULL,
    scheduled_date_time DATETIME NOT NULL,
    address VARCHAR(500) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    estimated_weight DECIMAL(5,2),
    actual_weight DECIMAL(5,2),
    special_instructions TEXT,
    status ENUM('SCHEDULED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'SCHEDULED',
    points_earned INT DEFAULT 0,
    co2_saved DECIMAL(8,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (collector_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_donor_id (donor_id),
    INDEX idx_collector_id (collector_id),
    INDEX idx_status (status),
    INDEX idx_scheduled_date (scheduled_date_time),
    INDEX idx_created_at (created_at)
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    requirement_type ENUM('PICKUPS', 'WEIGHT', 'POINTS', 'STREAK') NOT NULL,
    requirement_value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_badges table
CREATE TABLE IF NOT EXISTS user_badges (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    badge_id BIGINT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (badge_id) REFERENCES badges(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_badge (user_id, badge_id),
    INDEX idx_user_id (user_id),
    INDEX idx_badge_id (badge_id)
);

-- Insert sample badges
INSERT INTO badges (name, description, icon, requirement_type, requirement_value) VALUES
('First Pickup', 'Complete your first waste pickup', 'star', 'PICKUPS', 1),
('Regular Contributor', 'Complete 5 waste pickups', 'award', 'PICKUPS', 5),
('Waste Champion', 'Complete 10 waste pickups', 'trophy', 'PICKUPS', 10),
('Super Contributor', 'Complete 20 waste pickups', 'crown', 'PICKUPS', 20),
('Eco Warrior', 'Collect 50kg of waste', 'leaf', 'WEIGHT', 50),
('Point Master', 'Earn 1000 eco points', 'target', 'POINTS', 1000);

-- Insert sample users (passwords are hashed with BCrypt)
INSERT INTO users (username, email, password, full_name, phone_number, address, user_type, eco_points, total_waste_collected, total_co2_saved) VALUES
('john_donor', 'john@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBaLyU5V9gZXLi', 'John Doe', '+1234567890', '123 Green Street, Eco City', 'HOUSEHOLD', 750, 45.5, 12.8),
('sarah_restaurant', 'sarah@restaurant.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBaLyU5V9gZXLi', 'Sarah Wilson', '+1234567891', '456 Food Avenue, Eco City', 'RESTAURANT', 1200, 78.2, 23.5),
('mike_collector', 'mike@collector.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBaLyU5V9gZXLi', 'Mike Johnson', '+1234567892', '789 Collection Road, Eco City', 'COLLECTOR', 500, 0.0, 0.0),
('eco_ngo', 'admin@econgu.org', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBaLyU5V9gZXLi', 'Eco NGO Admin', '+1234567893', '321 NGO Plaza, Eco City', 'NGO', 0, 0.0, 0.0);

-- Insert sample pickups
INSERT INTO pickups (donor_id, collector_id, scheduled_date_time, address, contact_number, estimated_weight, actual_weight, status, points_earned, co2_saved) VALUES
(1, 3, '2024-01-20 14:00:00', '123 Green Street, Eco City', '+1234567890', 5.0, 4.8, 'COMPLETED', 48, 1.44),
(1, 3, '2024-01-25 10:30:00', '123 Green Street, Eco City', '+1234567890', 3.0, 3.2, 'COMPLETED', 32, 0.96),
(2, 3, '2024-01-28 16:00:00', '456 Food Avenue, Eco City', '+1234567891', 8.0, 7.5, 'COMPLETED', 75, 2.25),
(1, NULL, '2024-02-01 15:00:00', '123 Green Street, Eco City', '+1234567890', 4.0, NULL, 'SCHEDULED', 0, 0.00);

-- Award some badges to users
INSERT INTO user_badges (user_id, badge_id) VALUES
(1, 1), -- John gets First Pickup
(1, 2), -- John gets Regular Contributor
(2, 1), -- Sarah gets First Pickup
(2, 2), -- Sarah gets Regular Contributor
(2, 3); -- Sarah gets Waste Champion
