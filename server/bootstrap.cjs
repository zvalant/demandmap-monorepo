/* this will start the server leveraging commonjs to
allow IISNode to handle requests without erroring out
*/

import('./src/server.js')
  .then(() => console.log('Server started'))
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
