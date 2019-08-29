// eslint-disable-next-line strict
module.exports = () => {
  const jwt = require('jsonwebtoken');
  return async function(ctx, next) {
    if (ctx.request.header.authorization) {
      const token = ctx.request.header.authorization.split(' ')[1];
      console.log(token);
      let decoded;
      // 解码token
      try {
        decoded = jwt.verify(token, 'xlongway');
      } catch (error) {
        ctx.status = 401;
        ctx.body = {
          message: '用户信息失效，请重新登录',
        };
        return;
      }
      // 重置cookie时间
      ctx.cookies.set('token', token, {
        maxAge: 60 * 1000,
        httpOnly: false,
        overwrite: true,
        signed: false,
      });
      await next();
    } else {
      ctx.status = 401;
      ctx.body = {
        message: '请重新登录',
      };
      return;
    }
  };
};
