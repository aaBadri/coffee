// export default () => ({
//   environment: process.env.NODE_ENV || 'deployment',
//   database: {
//     host: process.env.DATABASE_HOST,
//     port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
//   },
// });

import { registerAs } from '@nestjs/config';

// registerAs exposes KEY property
export default registerAs('app_config', () => ({
  environment: process.env.NODE_ENV || 'deployment',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  apiKey: process.env.API_KEY,
}));
