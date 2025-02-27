-- Insert random data into Adventurer table
INSERT INTO Adventurer (name, archetype, experience, daily_rate) VALUES
    ('Lara Croft', 'HUNTER', 1200, 300.0),
    ('Geralt of Rivia', 'WARRIOR', 2500, 500.0),
    ('Aragorn', 'PALADIN', 1800, 400.0),
    ('Lina Inverse', 'MAGE', 1500, 350.0),
    ('Robin Hood', 'ROGUE', 2000, 450.0);

-- Insert random data into Request table
INSERT INTO Request (title, description, bounty, status, due_date, backer) VALUES
    ('Retrieve the Lost Sword', 'Find and bring back the legendary lost sword.', 1000.0, 'PENDING', '2025-03-15', 'King Arthur'),
    ('Eliminate the Dragon', 'Defeat the dragon terrorizing the village.', 2000.0, 'PENDING', '2025-04-20', 'Village Chief'),
    ('Protect the Caravan', 'Escort the merchant caravan safely through the forest.', 800.0, 'PENDING', '2025-05-10', 'Merchant Guild'),
    ('Rescue the Princess', 'Rescue the princess kidnapped by the bandits.', 1500.0, 'PENDING', '2025-06-05', 'Queen Eliza'),
    ('Explore the Ancient Ruins', 'Investigate the ancient ruins and report any findings.', 1200.0, 'PENDING', '2025-07-01', 'Historian Society');
