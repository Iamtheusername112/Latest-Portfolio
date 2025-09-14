ALTER TABLE "projects" ADD COLUMN "short_description" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "tech_stack" json;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "category" varchar(100);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" varchar(50) DEFAULT 'planning';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "priority" varchar(20) DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "start_date" timestamp;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "estimated_hours" integer;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "actual_hours" integer;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "demo_url" varchar(500);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "documentation_url" varchar(500);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "gallery" json;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "challenges" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "solutions" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "lessons_learned" text;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "client" varchar(255);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "team_size" integer DEFAULT 1;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "budget" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "tags" json;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "is_public" boolean DEFAULT true;