SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
  "_id" serial NOT NULL,
  "google_id" varchar(50) NOT NULL,
  "display_name" varchar NOT NULL,
  "given_name" varchar NOT NULL,
  "family_name" varchar NOT NULL,
  "picture" varchar,
  "email" varchar(320) NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.recipes (
  "_id" serial NOT NULL,
  "mongo_id" varchar(30) NOT NULL,
  CONSTRAINT "recipes_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.groups (
  "_id" serial NOT NULL,
  "name" varchar(30) NOT NULL,
  "description" varchar(200),
  CONSTRAINT "groups_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.user_recipes (
  "_id" serial NOT NULL,
  "user_id" int NOT NULL,
  "recipe_id" int NOT NULL,
  "cooked" boolean NOT NULL,
  CONSTRAINT "user_recipes_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.user_groups (
  "_id" serial NOT NULL,
  "user_id" int NOT NULL,
  "group_id" int NOT NULL,
  CONSTRAINT "user_groups_pk" PRIMARY KEY ("_id")
);

CREATE TABLE public.group_recipes (
  "_id" serial NOT NULL,
  "group_id" int NOT NULL,
  "recipe_id" int NOT NULL,
  CONSTRAINT "group_recipes_pk" PRIMARY KEY ("_id")
);

ALTER TABLE public.user_recipes ADD CONSTRAINT "user_recipes_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_recipes ADD CONSTRAINT "user_recipes_fk1" FOREIGN KEY ("recipe_id") REFERENCES public.recipes("_id");

ALTER TABLE public.user_groups ADD CONSTRAINT "user_groups_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE public.user_groups ADD CONSTRAINT "user_groups_fk1" FOREIGN KEY ("group_id") REFERENCES public.groups("_id");

ALTER TABLE public.group_recipes ADD CONSTRAINT "group_recipes_fk0" FOREIGN KEY ("group_id") REFERENCES public.groups("_id");
ALTER TABLE public.group_recipes ADD CONSTRAINT "group_recipes_fk1" FOREIGN KEY ("recipe_id") REFERENCES public.recipes("_id");