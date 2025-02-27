-- Insert random data into Adventurer table
INSERT INTO Adventurer (id, name, archetype, experience, daily_rate) VALUES
    (1, 'Lara Croft', 'HUNTER', 1200, 300.0),
    (2, 'Geralt of Rivia', 'WARRIOR', 2500, 500.0),
    (3, 'Aragorn', 'PALADIN', 1800, 400.0),
    (4, 'Lina Inverse', 'MAGE', 1500, 350.0),
    (5, 'Robin Hood', 'ROGUE', 2000, 450.0);

-- Insert random data into Request table
INSERT INTO Request (id, title, description, bounty, status, due_date, backer) VALUES
    (1, 'Retrieve the Lost Sword', 'Find and bring back the legendary lost sword.', 1000.0, 'PENDING', '2025-03-15', 'King Arthur'),
    (2, 'Eliminate the Dragon', 'Defeat the dragon terrorizing the village.', 2000.0, 'PENDING', '2025-04-20', 'Village Chief'),
    (3, 'Protect the Caravan', 'Escort the merchant caravan safely through the forest.', 800.0, 'PENDING', '2025-05-10', 'Merchant Guild'),
    (4, 'Rescue the Princess', 'Rescue the princess kidnapped by the bandits.', 1500.0, 'PENDING', '2025-06-05', 'Queen Eliza'),
    (5, 'Explore the Ancient Ruins', 'Investigate the ancient ruins and report any findings.', 1200.0, 'PENDING', '2025-07-01', 'Historian Society');
