CREATE TABLE `episodes` (
	`id` text PRIMARY KEY NOT NULL,
	`episode_number` integer NOT NULL,
	`title` text NOT NULL,
	`title_japanese` text NOT NULL,
	`air_date` text NOT NULL,
	`synopsis` text NOT NULL,
	`show_id` text NOT NULL,
	FOREIGN KEY (`show_id`) REFERENCES `shows`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `movies` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`title_japanese` text NOT NULL,
	`release_date` text NOT NULL,
	`runtime` integer NOT NULL,
	`synopsis` text NOT NULL,
	`studio_id` text NOT NULL,
	FOREIGN KEY (`studio_id`) REFERENCES `studios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shows` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`episodes` integer NOT NULL,
	`aired` text NOT NULL,
	`synopsis` text NOT NULL,
	`studio_id` text,
	FOREIGN KEY (`studio_id`) REFERENCES `studios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `studios` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`founded` integer NOT NULL,
	`location` text NOT NULL,
	`website` text
);
