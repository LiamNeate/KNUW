import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  LatestInvoiceRaw,
  User,
  Revenue,
  TopicsTable,
  CategoryTable,
  ScoresTable,
  EndorsementsTable
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;


export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM topics
    WHERE
      topics.topic::text ILIKE ${`%${query}%`} OR
      topics.info::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  noStore();
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchAllTopics() {
  noStore();
  try {
    const allTops = await sql`
      SELECT 
        topics.id,
        topics.topic,
        categories.category
      FROM topics
      LEFT JOIN categories ON topics.category = categories.id
    `;

    return allTops.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all topics.');
  }
}

export async function fetchCategories() {
  noStore();
  try {
    const categories = await sql<CategoryTable>`
      SELECT *
      FROM categories
    `;

    return categories.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }
}

export async function fetchCategoryTopics(
  category_id:string,
  query:string,
) {
  noStore();
  try {
    const topics = await sql<TopicsTable>`
      SELECT *
      FROM topics
    `;
    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch relevant topics.');
  }
}

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();

  try {
    const topics = await sql<TopicsTable>`
      SELECT
        topics.id,
        topics.topic,
        topics.category,
        topics.info,
        topics.website
      FROM topics
      WHERE
        topics.topic::text ILIKE ${`%${query}%`} OR
        topics.info::text ILIKE ${`%${query}%`} 
      ORDER BY topics.topic DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchTopics(
  query: string,
) {
  noStore();
  try {
    const topics = await sql<TopicsTable>`
      SELECT
        topics.id,
        topics.topic,
        topics.category,
        topics.info,
        topics.website
      FROM topics
      ORDER BY topics.topic DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchTopic(
  query: string,
) {
  noStore();
  try {
    const topics = await sql<TopicsTable>`
      SELECT *
      FROM topics
      WHERE
      topics.id = ${`${query}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}


export async function fetchFilteredTopics(
  query: string,
) {
  noStore();
  try {
    const topics = await sql<TopicsTable>`
      SELECT
        topics.id,
        topics.topic,
        topics.category,
        topics.info,
        topics.website
      FROM topics
      WHERE
        topics.topic ILIKE ${`%${query}%`} OR
        topics.info ILIKE ${`%${query}%`} 
      ORDER BY topics.topic DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredTopicsByCat(
  query: string,
  topic: string,
) {
  noStore();
  try {
    const topics = await sql<TopicsTable>`
      SELECT
        topics.id,
        topics.topic,
        topics.category,
        topics.info,
        topics.website,
        topics.blocked,
        topics.image
      FROM topics
      WHERE
        (topics.topic::text ILIKE ${`%${query}%`} OR
        topics.info::text ILIKE ${`%${query}%`}) AND
        topics.category::text ILIKE ${`${topic}`}
      ORDER BY topics.topic DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchComments(
  query: string,
  id: string
){
  noStore();
  try {
    const topics = await sql`
    SELECT 
      users.fname,
      users.sname,
      users.id AS userId,
      scores.rating,
      scores.recom,
      comments.id AS commentId,
      comments.comment,
      comments.likes,
      comments.dislikes,
      comments.likes - comments.dislikes AS difference,
      likes.liked,
      likes.left_like,
      likes.id AS likeId
    FROM users
    FULL OUTER JOIN scores ON users.id = scores.user_id
    FULL OUTER JOIN comments ON users.id = comments.user_id
    LEFT JOIN likes ON 
      (comments.id = likes.comment_id AND likes.user_id =  ${`${id}`})
    WHERE
      users.id = scores.user_id
      AND users.id = comments.user_id
      AND scores.topic_id =  ${`${query}`}
      AND comments.topic_id =  ${`${query}`}
      AND scores.complete = true
    ORDER BY difference DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments.');
  }
}

export async function fetchAllUserComments(
  id: string
){
  noStore();
  try {
    const topics = await sql`
    SELECT 
    users.id AS userId,
      scores.rating,
      scores.recom,
      comments.id AS commentId,
      comments.comment,
      topics.topic,
      categories.category
    FROM users
    FULL OUTER JOIN scores ON users.id = scores.user_id
    FULL OUTER JOIN comments ON users.id = comments.user_id
    LEFT JOIN topics ON comments.topic_id = topics.id
    LEFT JOIN categories ON topics.category = categories.id
    WHERE
      users.id = scores.user_id
      AND users.id = comments.user_id
      AND users.id = ${`${id}`}
    ORDER BY categories.category DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments.');
  }
}

export async function fetchEndorsementsPerTopic(
  query: string,
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        users.fname,
        users.sname,
        users.id AS userid,
        scores.rating,
        scores.recom,
        scores.endorsements
      FROM scores, users
      WHERE 
        scores.topic_id = ${`${query}`}
        AND users.id = scores.user_id
      ORDER BY scores.endorsements DESC
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comments.');
  }
}

export async function fetchEndorsementsByCat(
  query: string,
  id: string,
){
  noStore();
  try {
    const topics = await sql`
    SELECT 
      endorsements.id,
      endorsements.reason,
      topics.topic,
      categories.category,
      users.fname,
      users.sname
    FROM endorsements
      LEFT JOIN topics ON endorsements.topic_id = topics.id
      LEFT JOIN categories ON topics.category = categories.id
      LEFT JOIN users ON endorsements.giver_id = users.id
    WHERE endorsements.reciever_id=${`${id}`}
    AND categories.id=${`${query}`};
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users endorsements.');
  }
}

export async function fetchEndorsementAmmout(
  id: string,
){
  noStore();
  try {
    const topics = await sql`
    SELECT 
      COUNT(*) AS total
    FROM endorsements
    WHERE endorsements.reciever_id=${`${id}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total user endorsements.');
  }
}


export async function fetchUserComment(
  query: string,
  id: string
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        scores.rating,
        scores.recom,
        comments.comment
      FROM users, scores, comments
      WHERE
        users.id = scores.user_id
        AND users.id = comments.user_id
        AND scores.topic_id = ${`${query}`}
        AND comments.topic_id = ${`${query}`}
        AND users.id = ${`${id}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment.');
  }
}


export async function fetchUserId(
  email: string
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        id,
        pre_name
      FROM users
      WHERE
        email = ${`${email}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user id.');
  }
}

export async function checkExists(
  id: string,
  topic: string
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        scores.id AS scoresId,
        comments.id AS commentsId
      FROM comments, scores
      WHERE
        scores.user_id = ${`${id}`}
        AND scores.topic_id = ${`${topic}`}
        AND comments.user_id = ${`${id}`}
        AND comments.topic_id = ${`${topic}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check comment exists.');
  }
}

export async function fetchUserInfo(
  id: string
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        *,
        teams.team_name,
        teams.boss
      FROM users
      LEFT JOIN teams ON users.team = teams.id
      WHERE
        users.id = ${`${id}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user profile.');
  }
}

export async function fetchBossName(
  id: string
){
  noStore();
  try {
    const topics = await sql`
      SELECT 
        fname,
        sname
      FROM users
      WHERE
        id = ${`${id}`}
    `;

    return topics.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch manager information.');
  }
}