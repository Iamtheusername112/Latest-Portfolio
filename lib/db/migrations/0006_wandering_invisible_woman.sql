CREATE TABLE "performance_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_speed" integer,
	"load_time" numeric(5, 2),
	"requests" integer,
	"bundle_size" integer,
	"images" integer,
	"scripts" integer,
	"styles" integer,
	"accessibility" integer,
	"best_practices" integer,
	"seo" integer,
	"timestamp" timestamp DEFAULT now()
);
