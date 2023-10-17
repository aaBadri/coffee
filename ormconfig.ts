import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pass123',
  database: 'coffee',
  migrationsTableName: 'custom_migration_table',
  entities: ['dist/**/**.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
