CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`uid` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`name` varchar(255),
	`gender` varchar(20),
	`age` varchar(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_uid_unique` UNIQUE(`uid`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`)
);
