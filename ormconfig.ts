export = {
   'type': 'postgres',
   'host': 'localhost',
   'port': 5432,
   'username': process.env.DB_USERNAME,
   'password': process.env.DB_PASSWORD,
   'database': process.env.DB_DATABASE,
   'synchronize': true,
   'logging': false,
   'migrations': [
        'migrations/*.ts'
    ],
   'cli': {
      'entitiesDir': 'src/entity',
      'migrationsDir': 'src/migration',
      'subscribersDir': 'src/subscriber'
    },
   'entities': [
      "src/entity/**/*.ts"
   ],
};
