ALTER TABLE "hero_content" ADD COLUMN "profile_image_url" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "background_image_url" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "background_video_url" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "background_type" varchar(50) DEFAULT 'gradient';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "primary_button_text" varchar(100) DEFAULT 'View My Work';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "primary_button_action" varchar(50) DEFAULT 'scroll';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "primary_button_link" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "secondary_button_text" varchar(100) DEFAULT 'Download CV';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "secondary_button_action" varchar(50) DEFAULT 'download';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "secondary_button_link" varchar(500);--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "show_scroll_indicator" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "scroll_indicator_text" varchar(100) DEFAULT 'Scroll Down';--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "custom_css" text;--> statement-breakpoint
ALTER TABLE "hero_content" ADD COLUMN "is_active" boolean DEFAULT true;