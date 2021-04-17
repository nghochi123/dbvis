-- ADDING INTO USERS

INSERT INTO users (username, email) 
VALUES 
('hochi', 'hochi@gmail.com'),
('muthu', 'muthu@hotmail.com'),
('bob', 'bob@hotmail.com'),
('ali', 'ali@hotmail.com'),
('trash', 'trash@hotmail.com');

-- ADDING INTO GROUPS

INSERT INTO grp (group_name, owner_id) 
VALUES 
('Test_Group', 1),
('Second_group', 1),
('Third_Group', 2);

-- ADDING INTO DATABASES

INSERT INTO db (db_name, group_id)
VALUES
('Test_database', 1),
('Test_database_second', 2),
('Test_database_third', 2);

-- ADDING INTO TABLES

INSERT INTO tbl (tbl_name, color, _top, _left, db_id)
VALUES
('cats', 25, 20, 80, 1),
('dogs', 50, 120, 180, 1),
('poopy', 75, 220, 280, 1),
('piss', 100, 320, 380, 1);

INSERT INTO field_data (field_name, field, field_type, field_key, table_id)
VALUES
('hochi-Test_Group-Test_database-cats-cat1', 'cat1', 'int', 'Foreign', '1'),
('hochi-Test_Group-Test_database-cats-cat2', 'cat2', 'varchar', '-', '1'),
('hochi-Test_Group-Test_database-dogs-dog1', 'dog1', 'int', '-', '2'),
('hochi-Test_Group-Test_database-dogs-dog2', 'dog2', 'int', '-', '2'),
('hochi-Test_Group-Test_database-poopy-shit', 'shit', 'varchar', '-', '3'),
('hochi-Test_Group-Test_database-piss-pisscrap', 'pisscrap', 'int', 'Primary', '4');

INSERT INTO group_user (userid, groupid)
VALUES
(1,1),
(1,2),
(2,1),
(2,2),
(2,3),
(3,1),
(3,3),
(4,3);

INSERT INTO field_connection (arrow_from, arrow_to)
VALUES
('hochi-Test_Group-Test_database-cats-cat1', 'hochi-Test_Group-Test_database-piss-pisscrap'),
('hochi-Test_Group-Test_database-cats-cat2', 'hochi-Test_Group-Test_database-poopy-shit'),
('hochi-Test_Group-Test_database-cats-cat1', 'hochi-Test_Group-Test_database-dogs-dog1');




