const resolveConfig = {
    fallback: {
      process: require.resolve('process/browser')
    }
  };
  
  // Use resolveConfig when creating the webpack configuration
  const webpackConfig = {
    // webpack configuration options...
    resolve: resolveConfig
  };
  
  // Rest of your webpack configuration...
  
module.exports = webpackConfig;
  