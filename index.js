// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!

const server = require('./server.js');

PORT = 4000;

server.listen(PORT, () => {
  console.log(`\n*** Server Running on PORT ${PORT} ***\n`);
});
