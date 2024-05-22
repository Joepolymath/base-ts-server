import { AppDataSource } from '../../../../shared/configs/db/pg.config';
import { User } from '../entities/user.entity';

export const userRepository = AppDataSource.getRepository(User);
