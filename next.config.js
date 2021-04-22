module.exports = {

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        new webpack.IgnorePlugin(/mariasql/, /\/knex\//),
        new webpack.IgnorePlugin(/mssql/, /\/knex\//),
        new webpack.IgnorePlugin(/postgres/, /\/knex\//),
        new webpack.IgnorePlugin(/oracle/, /\/knex\//),
        new webpack.IgnorePlugin(/oracledb/, /\/knex\//),
        new webpack.IgnorePlugin(/pg-query-stream/, /\/knex\//),
        new webpack.IgnorePlugin(/sqlite3/, /\/knex\//),
        new webpack.IgnorePlugin(/strong-oracle/, /\/knex\//)
      return config
    },
  };