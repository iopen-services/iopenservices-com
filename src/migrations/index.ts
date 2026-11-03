import * as migration_20261021_192742_initial_schema from './20261021_192742_initial_schema';
import * as migration_20261102_005004_find_missing_column from './20261102_005004_find_missing_column';
import * as migration_20261103_193707_add_media_prefix_and_objectkey from './20261103_193707_add_media_prefix_and_objectkey';

export const migrations = [
  {
    up: migration_20261021_192742_initial_schema.up,
    down: migration_20261021_192742_initial_schema.down,
    name: '20261021_192742_initial_schema',
  },
  {
    up: migration_20261102_005004_find_missing_column.up,
    down: migration_20261102_005004_find_missing_column.down,
    name: '20261102_005004_find_missing_column',
  },
  {
    up: migration_20261103_193707_add_media_prefix_and_objectkey.up,
    down: migration_20261103_193707_add_media_prefix_and_objectkey.down,
    name: '20261103_193707_add_media_prefix_and_objectkey'
  },
];
