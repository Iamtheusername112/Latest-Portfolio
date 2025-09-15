CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"general" json,
	"user" json,
	"security" json,
	"notifications" json,
	"backup" json,
	"advanced" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
