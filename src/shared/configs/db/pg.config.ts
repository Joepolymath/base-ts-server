import { DataSource } from 'typeorm';
import logger from '../logs.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'equally-db-user',
  password: '',
  database: 'equally-dev',
  synchronize: true,
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});

const connectDb = async (uri?: string) => {
  try {
    const connDataSource = await AppDataSource.initialize();
    logger.info(
      `Database connected successfully. DataSource: ${connDataSource}`
    );
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connectDb;
