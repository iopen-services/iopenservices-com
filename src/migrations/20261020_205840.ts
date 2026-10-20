import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   // ... (full migration content from the original file)
   DROP TYPE "public"."enum_header_nav_items_link_type";
   DROP TYPE "public"."enum_footer_nav_items_link_type";`)
}