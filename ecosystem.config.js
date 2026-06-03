module.exports = {
  apps: [
    {
      name: 'gastroshows',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
