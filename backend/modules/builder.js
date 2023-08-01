const express = require("express");
class Server {
  constructor() {
    this.app = express();
  }

  get(route, callback) {
    this.app.get(route, callback);
  }

  run(port) {
    this.app.listen(port, () => {
      console.log("The server is running on port", port);
    });
  }
}

module.exports = Server;