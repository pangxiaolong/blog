'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const form = this.ctx.request.body;
    const loginToken = await this.ctx.service.user.login(form);
    this.ctx.body = loginToken;
  }
}

module.exports = UserController;
