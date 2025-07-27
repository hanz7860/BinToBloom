-- This will run automatically when the application starts

-- Insert default impact metrics if not exists
INSERT IGNORE INTO impact_metrics (id, total_waste_collected, total_pesticide_produced, total_partner_ngos, total_acres_treated, total_co2_saved, total_active_users) 
VALUES (1, 2500.0, 1200.0, 45, 150.0, 5750.0, 1250);

-- Insert sample badges if not exists
INSERT IGNORE INTO badges (id, name, description, icon_url, type, required_points, required_waste, required_pickups) VALUES
(1, 'Waste Champion', 'Collected over 50kg of waste', '/icons/waste-champion.png', 'WASTE_CHAMPION', 500, 50.0, 0),
(2, 'Regular Contributor', 'Completed 10 pickups', '/icons/regular-contributor.png', 'REGULAR_CONTRIBUTOR', 0, 0.0, 10),
(3, 'Eco Warrior', 'Earned 1000 eco points', '/icons/eco-warrior.png', 'ECO_WARRIOR', 1000, 0.0, 0),
(4, 'Community Hero', 'Earned 2000 eco points', '/icons/community-hero.png', 'COMMUNITY_HERO', 2000, 0.0, 0),
(5, 'Zero Waste Hero', 'Collected over 100kg of waste', '/icons/zero-waste-hero.png', 'ZERO_WASTE_HERO', 1000, 100.0, 0);