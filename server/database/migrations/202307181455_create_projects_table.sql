CREATE TABLE IF NOT EXISTS "Projects" (
    system_id INT PRIMARY KEY,
    system_name TEXT,
    location TEXT,
    inverter_brand TEXT,
    panel_brand TEXT,
    panel_power INT,
    panel_quantity INT,
    installed_power INT,
    current_generation INT,
    total_generation INT
);
