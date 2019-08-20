'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(form) {
    let result = {
      code: 20000,
      data: {},
    };
    try {
      const user = await this.app.mysql.get('user', { name: form.username, password: form.password });
      if (user) {
        result.data.token = user.role;
        result.msg = '登录成功！';
      } else {
        result.code = 0;
        result.msg = '请检查用户名和密码！';
      }
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = UserService;
