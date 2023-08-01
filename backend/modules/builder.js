import Koa from "koa";
import Router from "koa-router";

class Server {
  constructor() {
    this.app = new Koa();
    this.router = new Router();
  }

  get(route, callback) {
    this.router.get(route, callback);
  }

  run(port) {
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());

    this.app.listen(port, () => {
      console.log("The server is running on port", port);
    });
  }
}

export default Server;