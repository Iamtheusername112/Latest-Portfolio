CREATE TABLE "logo_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(50) NOT NULL,
	"text_content" varchar(255),
	"image_url" varchar(500),
	"svg_content" text,
	"alt" varchar(255),
	"width" integer,
	"height" integer,
	"show_text" boolean DEFAULT true,
	"text_size" varchar(20) DEFAULT 'md',
	"variant" varchar(50) DEFAULT 'default',
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
