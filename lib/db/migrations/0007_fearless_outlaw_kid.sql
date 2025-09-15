CREATE TABLE "footer_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"brand" json,
	"social_links" json,
	"quick_links" json,
	"contact_info" json,
	"copyright" json,
	"layout" json,
	"styling" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
