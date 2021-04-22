module.exports = {
    // Target must be serverless
    target: 'serverless',
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.plugins.push(new webpack.IgnorePlugin(/^oracle$/));
      config.plugins.push(new webpack.IgnorePlugin(/^oracledb$/));
      config.plugins.push(new webpack.IgnorePlugin(/^postgres$/));
      config.plugins.push(new webpack.IgnorePlugin(/^redshift$/));
      config.plugins.push(new webpack.IgnorePlugin(/^tedious$/));
      config.plugins.push(new webpack.IgnorePlugin(/^sqlite3$/))
      return config
    },
  };