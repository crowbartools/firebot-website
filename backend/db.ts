import { Pool } from 'pg';

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
              connectionString: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
          }
        : {
              host: process.env.POSTGRES_HOST,
              port: parseInt(process.env.POSTGRES_PORT, 10),
              user: process.env.POSTGRES_USER,
              password: process.env.POSTGRES_PASSWORD,
              database: 'firebot',
              ssl: {
                  rejectUnauthorized: false,
              },
          }
);

export const query = async (text: string, params?: any[]) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        return null;
    }
};
