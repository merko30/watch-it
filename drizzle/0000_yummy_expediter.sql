CREATE TYPE "public"."status" AS ENUM('wishlist', 'watching', 'watched', 'watch-again');--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('movie', 'tv');--> statement-breakpoint
CREATE TABLE "movies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "movies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"status" "status" DEFAULT 'watching',
	"tmdbId" integer NOT NULL,
	"tmdbType" "type" NOT NULL,
	"details" json,
	"description" text,
	"genres" varchar(255)[],
	"rating" integer,
	"image" varchar(255),
	"userId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(255) NOT NULL,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "movies" ADD CONSTRAINT "movies_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;