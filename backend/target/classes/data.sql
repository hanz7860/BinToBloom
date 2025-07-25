-- Insert sample badges
INSERT INTO badges (name, description, icon_url, type, required_points, required_waste, required_pickups) VALUES
('Waste Champion', 'Collected over 50kg of waste', '/icons/waste-champion.png', 'WASTE_CHAMPION', 500, 50.0, 0),
('Regular Contributor', 'Completed 10 pickups', '/icons/regular-contributor.png', 'REGULAR_CONTRIBUTOR', 0, 0.0, 10),
('Eco Warrior', 'Earned 1000 eco points', '/icons/eco-warrior.png', 'ECO_WARRIOR', 1000, 0.0, 0),
('Community Hero', 'Earned 2000 eco points', '/icons/community-hero.png', 'COMMUNITY_HERO', 2000, 0.0, 0),
('Zero Waste Hero', 'Collected over 100kg of waste', '/icons/zero-waste-hero.png', 'ZERO_WASTE_HERO', 0, 100.0, 0);

-- Insert sample users
INSERT INTO users (username, email, password, full_name, phone_number, address, user_type, status, eco_points, total_waste_collected, total_co2_saved, created_at, updated_at) VALUES
('sarah_m', 'sarah@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5OCP2TiDUW4hniq', 'Sarah Miller', '+1234567890', '123 Green St, EcoCity', 'HOUSEHOLD', 'ACTIVE', 1250, 54.5, 125.35, NOW(), NOW()),
('mike_r', 'mike@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5OCP2TiDUW4hniq', 'Mike Rodriguez', '+1234567891', '456 Eco Ave, GreenTown', 'HOUSEHOLD', 'ACTIVE', 980, 42.3, 97.29, NOW(), NOW()),
('collector1', 'collector1@example.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE5OCP2TiDUW4hniq', 'John Collector', '+1234567892', '789 Collection Rd, WasteCity', 'COLLECTOR', 'ACTIVE', 500, 0.0, 0.0, NOW(), NOW());

-- Insert global impact metrics
INSERT INTO impact_metrics (total_waste_collected, total_pesticide_produced, total_partner_ngos, total_acres_treated, total_co2_saved, total_active_users, last_updated) VALUES
(2500.0, 1200.0, 45, 150.0, 5750.0, 1250, NOW());
