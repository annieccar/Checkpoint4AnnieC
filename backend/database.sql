-- Active: 1689178327332@@127.0.0.1@3306@my_kitchn

DROP TABLE IF EXISTS `receipe_has_category`;

DROP TABLE IF EXISTS `category`;

DROP TABLE IF EXISTS `recipe`;

DROP TABLE IF EXISTS `user`;

CREATE TABLE
    `user` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `user_name` varchar(100) NOT NULL,
        `email` varchar(100) NOT NULL,
        `password` varchar(100) NOT NULL,
        PRIMARY KEY (`Id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 8 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
    my_kitchn.`user` (Id, user_name, email, password)
VALUES (
        1,
        'Anniec',
        'annie@toto.com',
        '$argon2id$v=19$m=65536,t=5,p=1$kapCw7MOSvxLy2L1bSyN+w$87lPyaQbX1qYZVuzAl1GEXqkWEZ7OJ1zbJmp64+CsTk'
    );

CREATE TABLE
    `recipe` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `title` varchar(100) NOT NULL,
        `file_name` varchar(100) NOT NULL,
        `notes` varchar(200) DEFAULT NULL,
        `user_id` int NOT NULL,
        PRIMARY KEY (`Id`),
        KEY `Recipe_FK` (`user_id`),
        CONSTRAINT `Recipe_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 34 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
    my_kitchn.recipe (
        Id,
        title,
        file_name,
        notes,
        user_id
    )
VALUES (
        1,
        'Pudding Chômeur',
        'pudding_chomeur.pdf',
        'Can add shredded coconut into the batter**',
        1
    );

INSERT INTO
    my_kitchn.recipe (
        Id,
        title,
        file_name,
        notes,
        user_id
    )
VALUES (
        2,
        'Pad Thai',
        'Classic_pad_thai.pdf',
        NULL,
        1
    );

INSERT INTO
    my_kitchn.recipe (
        Id,
        title,
        file_name,
        notes,
        user_id
    )
VALUES (
        3,
        'Butter Chicken',
        'butter_chicken.pdf',
        '',
        1
    );

CREATE TABLE
    `category` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(100) NOT NULL,
        `user_id` int NOT NULL,
        PRIMARY KEY (`Id`),
        KEY `Category_FK` (`user_id`),
        CONSTRAINT `Category_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(1, 'Dessert', 1);

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(2, 'Main', 1);

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(3, 'Starter', 1);

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(4, 'Vegetarian', 1);

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(5, 'Indian', 1);

INSERT INTO
    my_kitchn.category (Id, name, user_id)
VALUES(6, 'Mexican', 1);

CREATE TABLE
    `receipe_has_category` (
        `Id` int NOT NULL AUTO_INCREMENT,
        `recipe_id` int NOT NULL,
        `category_id` int NOT NULL,
        PRIMARY KEY (`Id`),
        KEY `receipe_has_category_FK_1` (`category_id`),
        KEY `receipe_has_category_FK` (`recipe_id`),
        CONSTRAINT `receipe_has_category_FK` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT `receipe_has_category_FK_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = InnoDB AUTO_INCREMENT = 51 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
    my_kitchn.receipe_has_category (Id, recipe_id, category_id)
VALUES(1, 1, 1);

INSERT INTO
    my_kitchn.receipe_has_category (Id, recipe_id, category_id)
VALUES(3, 2, 2);

INSERT INTO
    my_kitchn.receipe_has_category (Id, recipe_id, category_id)
VALUES(4, 2, 4);

INSERT INTO
    my_kitchn.receipe_has_category (Id, recipe_id, category_id)
VALUES(5, 3, 2);

INSERT INTO
    my_kitchn.receipe_has_category (Id, recipe_id, category_id)
VALUES(6, 3, 5);