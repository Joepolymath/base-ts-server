import { DataSource } from 'typeorm';
import logger from '../logs.config';
import { User } from '../../../modules/users/dataAccess/entities/user.entity';
import {
  PG_DB,
  PG_HOST,
  PG_PASSWORD,
  PG_PORT,
  PG_USERNAME,
} from '../env.config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: Number(PG_PORT),
  username: PG_USERNAME,
  password: PG_PASSWORD,
  database: PG_DB,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});

const connectDb = async (uri?: string) => {
  logger.info('Connecting to Postgresql...');
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
