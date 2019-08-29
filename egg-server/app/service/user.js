'use strict';

const Service = require('egg').Service;

const jwt = require('jsonwebtoken');

class UserService extends Service {
  async login(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const user = await this.app.mysql.get('user', {
        name: form.username,
        password: form.password,
      });
      if (user) {
        const token = jwt.sign({
          id: user.id,
          name: user.name,
        }, 'xlongway', {
          expiresIn: '7d',
        });
        result.data.token = user.role;
        result.data.tokenSign = token;
        this.ctx.cookies.set('token', token, {
          maxAge: 60 * 1000,
          httpOnly: false,
          overwrite: true,
          signed: false,
        });
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
