import { registerAs } from '@nestjs/config';

// coffees_config is used in the coffees.service.ts: this.configService.get('coffees_config')
export default registerAs('coffees_config', () => ({
  foo: 'bar',
}));
