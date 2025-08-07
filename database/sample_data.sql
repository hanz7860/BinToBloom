-- Insert sample users
INSERT INTO users (name, email, password, role, latitude, longitude, address) VALUES
('John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DONOR', 19.0760, 72.8777, '123 Main St, Mumbai, Maharashtra'),
('Jane Smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'COLLECTOR', 19.0825, 72.8811, '456 Oak Ave, Mumbai, Maharashtra'),
('Mike Johnson', 'mike@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'DONOR', 19.0896, 72.8656, '789 Pine Rd, Mumbai, Maharashtra'),
('Sarah Wilson', 'sarah@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'COLLECTOR', 19.0728, 72.8826, '321 Elm St, Mumbai, Maharashtra');

-- Insert sample pickups
INSERT INTO pickups (donor_id, waste_type, quantity, pickup_latitude, pickup_longitude, pickup_address, scheduled_time, status) VALUES
(1, 'Food Waste', 5.5, 19.0760, 72.8777, '123 Main St, Mumbai, Maharashtra', '2024-01-15 10:00:00', 'PENDING'),
(3, 'Vegetable Peels', 3.2, 19.0896, 72.8656, '789 Pine Rd, Mumbai, Maharashtra', '2024-01-16 14:30:00', 'PENDING');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message, type, pickup_id) VALUES
(2, 'New Pickup Available', 'A new pickup request is available near your location: Food Waste - 5.5kg', 'PICKUP_REQUEST', 1),
(4, 'New Pickup Available', 'A new pickup request is available near your location: Vegetable Peels - 3.2kg', 'PICKUP_REQUEST', 2);
