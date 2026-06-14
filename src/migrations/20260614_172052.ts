import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_videos_nivel" AS ENUM('basico', 'intermedio', 'avanzado');
  CREATE TYPE "public"."enum_videos_modalidad" AS ENUM('cash', 'torneos', 'mental-game', 'estadisticas', 'analisis-manos');
  ALTER TABLE "videos" DROP CONSTRAINT "videos_video_file_id_media_id_fk";
  
  ALTER TABLE "videos" DROP CONSTRAINT "videos_related_article_id_posts_id_fk";
  
  DROP INDEX "videos_video_file_idx";
  DROP INDEX "videos_related_article_idx";
  ALTER TABLE "videos" ADD COLUMN "slug" varchar;
  ALTER TABLE "videos" ADD COLUMN "descripcion_corta" varchar;
  ALTER TABLE "videos" ADD COLUMN "transcripcion" jsonb;
  ALTER TABLE "videos" ADD COLUMN "nivel" "enum_videos_nivel";
  ALTER TABLE "videos" ADD COLUMN "modalidad" "enum_videos_modalidad";
  ALTER TABLE "videos" ADD COLUMN "articulo_relacionado_id" integer;
  ALTER TABLE "videos" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "videos" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "videos" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_articulo_relacionado_id_posts_id_fk" FOREIGN KEY ("articulo_relacionado_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "videos_articulo_relacionado_idx" ON "videos" USING btree ("articulo_relacionado_id");
  ALTER TABLE "videos" DROP COLUMN "video_file_id";
  ALTER TABLE "videos" DROP COLUMN "description";
  ALTER TABLE "videos" DROP COLUMN "duration";
  ALTER TABLE "videos" DROP COLUMN "related_article_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "videos" DROP CONSTRAINT "videos_articulo_relacionado_id_posts_id_fk";
  
  DROP INDEX "videos_articulo_relacionado_idx";
  ALTER TABLE "videos" ADD COLUMN "video_file_id" integer;
  ALTER TABLE "videos" ADD COLUMN "description" varchar;
  ALTER TABLE "videos" ADD COLUMN "duration" numeric;
  ALTER TABLE "videos" ADD COLUMN "related_article_id" integer;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_video_file_id_media_id_fk" FOREIGN KEY ("video_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "videos" ADD CONSTRAINT "videos_related_article_id_posts_id_fk" FOREIGN KEY ("related_article_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "videos_video_file_idx" ON "videos" USING btree ("video_file_id");
  CREATE INDEX "videos_related_article_idx" ON "videos" USING btree ("related_article_id");
  ALTER TABLE "videos" DROP COLUMN "slug";
  ALTER TABLE "videos" DROP COLUMN "descripcion_corta";
  ALTER TABLE "videos" DROP COLUMN "transcripcion";
  ALTER TABLE "videos" DROP COLUMN "nivel";
  ALTER TABLE "videos" DROP COLUMN "modalidad";
  ALTER TABLE "videos" DROP COLUMN "articulo_relacionado_id";
  ALTER TABLE "videos" DROP COLUMN "meta_title";
  ALTER TABLE "videos" DROP COLUMN "meta_description";
  ALTER TABLE "videos" DROP COLUMN "meta_keywords";
  DROP TYPE "public"."enum_videos_nivel";
  DROP TYPE "public"."enum_videos_modalidad";`)
}
