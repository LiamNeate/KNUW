const { db } = require('@vercel/postgres');

async function addImage(client) {
  try {
    // Insert new image into the table
    const insertedTeams = await Promise.all(
      teams.map(async (team) => {
        return client.sql`
        UPDATE topics
        SET image = 'https://eesarv0hsj9j2qg5.public.blob.vercel-storage.com/postgresql-WAqimb73gwpYyNFRCAFsgrxgpDCo4M.png'
        WHERE topics.id = 3958dc1b-798f-4377-85e9-fec4b6a6442a
      `;
      }),
    );

    console.log(`Updated image`);

    return {
      teams: insertedTeams,
    };
  } catch (error) {
    console.error('Error adding image:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await addImage(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
