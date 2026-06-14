import * as migration_20260613_154543 from './20260613_154543';
import * as migration_20260614_004424 from './20260614_004424';
import * as migration_20260614_164339 from './20260614_164339';
import * as migration_20260614_172052 from './20260614_172052';

export const migrations = [
  {
    up: migration_20260613_154543.up,
    down: migration_20260613_154543.down,
    name: '20260613_154543',
  },
  {
    up: migration_20260614_004424.up,
    down: migration_20260614_004424.down,
    name: '20260614_004424',
  },
  {
    up: migration_20260614_164339.up,
    down: migration_20260614_164339.down,
    name: '20260614_164339',
  },
  {
    up: migration_20260614_172052.up,
    down: migration_20260614_172052.down,
    name: '20260614_172052'
  },
];
