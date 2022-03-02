
DROP DATABASE IF EXISTS `kenotejs-use-typeorm`;
CREATE DATABASE `kenotejs-use-typeorm` /*!40100 DEFAULT CHARACTER SET utf16 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `kenotejs-use-typeorm`;

CREATE TABLE IF NOT EXISTS `user`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `username` VARCHAR(100) DEFAULT NULL,
   `password` VARCHAR(100) DEFAULT NULL,
   `jwtoken` VARCHAR(250) DEFAULT NULL,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf16;

INSERT INTO `user` (username,password,jwtoken) VALUES
	 ('admin','admin',NULL);
INSERT INTO `user` (username,password,jwtoken) VALUES
	 ('thondery','123456',NULL);