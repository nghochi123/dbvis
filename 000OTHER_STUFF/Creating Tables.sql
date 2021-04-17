USE diagrams;

CREATE TABLE users (
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE grp (
	id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(20) NOT NULL,
    owner_id INT,
    FOREIGN KEY(owner_id) REFERENCES users(id)
);

CREATE TABLE db (
	id INT PRIMARY KEY AUTO_INCREMENT,
    db_name VARCHAR(20) NOT NULL,
    group_id INT,
    FOREIGN KEY(group_id) REFERENCES grp(id)
    ON DELETE CASCADE
);

CREATE TABLE tbl (
	id INT PRIMARY KEY AUTO_INCREMENT,
    tbl_name VARCHAR(20) NOT NULL,
    color INT,
    _top INT,
    _left INT,
    db_id INT,
    FOREIGN KEY(db_id) REFERENCES db(id)
    ON DELETE CASCADE
);

CREATE TABLE field_data (
    field_name VARCHAR(255) PRIMARY KEY,
    field VARCHAR(30) NOT NULL,
    field_type VARCHAR(30) NOT NULL,
    field_key VARCHAR(30) NOT NULL,
    table_id INT,
    FOREIGN KEY(table_id) REFERENCES tbl(id)
    ON DELETE CASCADE
);

CREATE TABLE group_user (
	userid INT,
    groupid INT,
    FOREIGN KEY(userid) REFERENCES users(id),
    FOREIGN KEY(groupid) REFERENCES grp(id),
    PRIMARY KEY(userid, groupid)
);

CREATE TABLE field_connection (
	arrow_from VARCHAR(255),
    arrow_to VARCHAR(255),
    FOREIGN KEY(arrow_from) REFERENCES field_data(field_name) ON DELETE CASCADE,
    FOREIGN KEY(arrow_to) REFERENCES field_data(field_name) ON DELETE CASCADE,
    PRIMARY KEY(arrow_from, arrow_to)
);
