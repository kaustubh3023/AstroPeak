CREATE TABLE `service_requests` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`uid` varchar(255),
	`name` varchar(255),
	`phone` varchar(20),
	`serviceType` varchar(255),
	`message` varchar(500),
	`status` varchar(20) DEFAULT 'queued',
	`createdAt` timestamp DEFAULT (now()),
	`updatedAt` timestamp DEFAULT (now()),
	CONSTRAINT `service_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `uid` varchar(255);