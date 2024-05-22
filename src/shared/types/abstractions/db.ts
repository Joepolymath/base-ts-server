export interface IDb {
  connect(uri?: string): Promise<void>;
}
