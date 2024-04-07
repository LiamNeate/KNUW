const { db } = require('@vercel/postgres');
const {
  teams,
  users,
  categories,
  topics,
  comments,
  scores,
  endorsements,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedTeams(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "teams" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS teams (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        team_name VARCHAR(255) NOT NULL
      );
    `;

    console.log(`Created "teams" table`);

    // Insert data into the "teams" table
    const insertedTeams = await Promise.all(
      teams.map(async (team) => {
        return client.sql`
        INSERT INTO teams (id, team_name)
        VALUES (${team.id}, ${team.team})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedTeams.length} teams`);

    return {
      createTable,
      teams: insertedTeams,
    };
  } catch (error) {
    console.error('Error seeding teams:', error);
    throw error;
  }
}

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        fname VARCHAR(255) NOT NULL,
        sname VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        team UUID NOT NULL REFERENCES teams (id) ON DELETE CASCADE,
        boss UUID REFERENCES users (id) ON DELETE SET NULL,
        admin BOOLEAN,
        pre_name VARCHAR(255)
      );
    `;

    console.log(`Created "users" table`);

    //Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, fname, sname, email, password, team, boss, admin, pre_name)
        VALUES (${user.id}, ${user.fname}, ${user.sname}, ${user.email}, ${hashedPassword}, ${user.team}, ${user.boss}, ${user.admin}, ${user.pre_name})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);


    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "category" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS categories (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      category VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "categories" table`);

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      categories.map(
        (category) => client.sql`
        INSERT INTO categories (id, category)
        VALUES (${category.id}, ${category.category})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} invoices`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedTopics(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "topics" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS topics (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        topic VARCHAR(255) NOT NULL,
        category UUID NOT NULL REFERENCES categories (id) ON DELETE CASCADE,
        info VARCHAR(255),
        website VARCHAR(255),
        documentation VARCHAR(255),
        notes VARCHAR(255),
        blocked BOOLEAN,
        image VARCHAR(255)
      );
    `;

    console.log(`Created "topics" table`);

    // Insert data into the "topics" table
    const insertedTopics = await Promise.all(
      topics.map(
        (topic) => client.sql`
        INSERT INTO topics (id, topic, category, info, website, documentation, notes, blocked, image)
        VALUES (${topic.id}, ${topic.topic}, ${topic.category}, ${topic.info}, ${topic.website}, ${topic.documentation}, ${topic.notes}, ${topic.blocked}, ${topic.image})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedTopics.length} topics`);

    return {
      createTable,
      topics: insertedTopics,
    };
  } catch (error) {
    console.error('Error seeding topics:', error);
    throw error;
  }
}

async function seedComments(client) {
  try {
    // Create the "comments" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        comment VARCHAR(255) NOT NULL,
        topic_id UUID NOT NULL REFERENCES topics (id) ON DELETE CASCADE,
        user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
        likes INTEGER,
        dislikes INTEGER
      );
    `;

    console.log(`Created "comments" table`);

    // Insert data into the "comments" table
    const insertedComments = await Promise.all(
      comments.map(
        (comment) => client.sql`
        INSERT INTO comments (id, comment, topic, user_id, likes, dislikes)
        VALUES (${comment.id}, ${comment.comment}, ${comment.topic}, ${comment.user_id}, ${comment.likes}, ${comment.dislikes})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedComments.length} comments`);

    return {
      createTable,
      comments: insertedComments,
    };
  } catch (error) {
    console.error('Error seeding comments:', error);
    throw error;
  }
}

async function seedScores(client) {
  try {
    //Create "scores" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS scores (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      topic_id UUID NOT NULL REFERENCES topics (id) ON DELETE CASCADE,
      user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      rating INTEGER,
      recom INTEGER,
      complete BOOLEAN,
      endorsements INTEGER
    );
    `;

    console.log(`Created "scores" table`);

    // Insert data into the "scores" table
    const insertedScores = await Promise.all(
      scores.map(
        (score) => client.sql`
        INSERT INTO scores (id, topic_id, user_id, rating, recom, complete, endorsements)
        VALUES (${score.id}, ${score.topic}, ${score.user}, ${score.rating}, ${score.recom}, true, ${score.endorsements})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedScores.length} scores`);

    return {
      createTable,
      scores: insertedScores,
    };
  } catch (error) {
    console.error('Error seeding scores:', error);
    throw error;
  }
}

async function seedEndorsements(client) {
  try {
    //Create "endorsements" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS endorsements (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      topic_id UUID NOT NULL REFERENCES topics (id) ON DELETE CASCADE,
      giver_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      reciever_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
      reason VARCHAR(255) NOT NULL
    );
    `;

    console.log(`Created "endrosements" table`);

    // Insert data into the "endorsements" table
    const insertedEndorsements = await Promise.all(
      endorsements.map(
        (endorsement) => client.sql`
        INSERT INTO endorsements (topic_id, giver_id, reciever_id, reason)
        VALUES (${endorsement.topic}, ${endorsement.giver}, ${endorsement.reciever}, ${endorsement.reason})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedEndorsements.length} endorsements`);

    return {
      createTable,
      endorsements: insertedEndorsements,
    };
  } catch (error) {
    console.error('Error seeding endorsements:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedTeams(client);
  await seedUsers(client);
  await seedCategories(client);
  await seedTopics(client);
  await seedComments(client);
  await seedScores(client);
  await seedEndorsements(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
