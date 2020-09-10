module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: '4.2.8', // MongoDB version
      skipMD5: true,
    },
    autoStart: false,
  },
};
