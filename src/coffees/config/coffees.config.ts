import { registerAs } from '@nestjs/config';

// registerAs exposes KEY property
export default registerAs('coffees_config', () => ({
  foo: 'bar',
}));
