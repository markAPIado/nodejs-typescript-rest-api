/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: 'ts-rest-api',
      script: 'dist/index.js',
      instances: 0,
      env_production: {
        NODE_ENV: 'production'
      },
      // Logging configuration options
      // --------------------------------
      // log_date_format: Specifies the format of the date in the log messages
      // error_file: Specifies the file where error messages are logged. NOTE: /var/log/nodeapp/error.log will be created in the container
      // out_file: Specifies the file where access messages are logged. NOTE: /var/log/nodeapp/access.log will be created in the container
      // merge_logs: Specifies whether to merge error and access logs into a single file
      log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
      error_file: '/var/log/nodeapp/error.log',
      out_file: '/var/log/nodeapp/access.log',
      merge_logs: false,

      max_restarts: 10,
      restart_delay: 5000,
      watch: false
    }
  ]
};
