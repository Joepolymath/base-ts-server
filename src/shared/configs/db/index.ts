import { IDb } from '../../types/abstractions/db';

class DatabaseFactory implements IDb {
  constructor(private connDb: (uri?: string) => Promise<void>) {}

  public async connect(uri?: string): Promise<void> {
    await this.connDb(uri);
  }
}

export default DatabaseFactory;
