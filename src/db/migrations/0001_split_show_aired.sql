PRAGMA foreign_keys=OFF;
--> statement-breakpoint
CREATE TABLE `__new_shows` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`title_japanese` text NOT NULL,
	`episodes` integer NOT NULL,
	`aired_from` text NOT NULL,
	`aired_to` text NOT NULL,
	`synopsis` text NOT NULL,
	`studio_id` text,
	FOREIGN KEY (`studio_id`) REFERENCES `studios`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_shows`("id", "title", "title_japanese", "episodes", "aired_from", "aired_to", "synopsis", "studio_id") SELECT "id", "title", '', "episodes", "aired", "aired", "synopsis", "studio_id" FROM `shows`;
--> statement-breakpoint
DROP TABLE `shows`;
--> statement-breakpoint
ALTER TABLE `__new_shows` RENAME TO `shows`;
--> statement-breakpoint
PRAGMA foreign_keys=ON;
