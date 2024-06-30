import sql from "../db.js";

export default async function createTables() {
  try {
    console.log("Creating extension pgcrypto...");
    await sql`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`;
    console.log("Extension created successfully.");

    console.log("Creating users table...");
    await sql`
    CREATE TABLE IF NOT EXISTS users(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW()
    )
  `;
    console.log("Users table created successfully.");

    console.log("Creating articles table...");

    await sql`
    CREATE TABLE IF NOT EXISTS articles(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      authorId UUID NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (authorId) REFERENCES users (id) on DELETE CASCADE
    )
  `;
    console.log("Articles table created successfully.");

    console.log("Creating comments table...");

    await sql`
    CREATE TABLE IF NOT EXISTS comments(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      content TEXT NOT NULL,
      authorId UUID NOT NULL,
      articleId UUID NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (articleId) REFERENCES articles (id) on DELETE CASCADE,
      FOREIGN KEY (authorId) REFERENCES users (id) on DELETE CASCADE
    )
  `;
    console.log("Comments table created successfully.");

    console.log("Creating likes table...");

    await sql`
    CREATE TABLE IF NOT EXISTS likes(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      authorId UUID NOT NULL,
      articleId UUID NOT NULL,
      createdAt TIMESTAMP DEFAULT NOW(),
      updatedAt TIMESTAMP DEFAULT NOW(),
      FOREIGN KEY (articleId) REFERENCES articles (id) on DELETE CASCADE,
      FOREIGN KEY (authorId) REFERENCES users (id) on DELETE CASCADE
    )
  `;
    console.log("Likes table created successfully.");

    console.log("Creating tags table...");

    await sql`
    CREATE TABLE IF NOT EXISTS tags(
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tag TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT now(),
      updatedAt TIMESTAMP DEFAULT now()
    )
  `;
    console.log("Tags table created successfully.");

    console.log("Creating articleTag table...");

    await sql`
    CREATE TABLE IF NOT EXISTS articleTag(
      articleId UUID NOT NULL,
      tagId UUID NOT NULL,
      PRIMARY KEY (articleId, tagId),
      FOREIGN KEY (articleId) REFERENCES articles (id) on DELETE CASCADE,
      FOREIGN KEY (tagId) REFERENCES tags (id) on DELETE CASCADE
    )
  `;

    console.log("Table are created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}
