export default () => ({
  environment: process.env.NODE_ENV || 'deployment',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
