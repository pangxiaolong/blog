'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async createClassify(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const item = await this.app.mysql.insert('classify', form);
      if (item.affectedRows === 1) {
        result.code = 20000;
        result.msg = '添加成功';
      } else {
        result.code = 0;
        result.msg = '添加失败';
      }
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
  async queryClassify() {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.select('classify');
      if (list) {
        result.code = 20000;
        result.msg = '查询成功';
        result.data = list;
      } else {
        result.code = 0;
        result.msg = '查询成功';
      }
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
  async updateClassify(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.update('classify', form);
      if (list.affectedRows === 1) {
        result.code = 20000;
        result.msg = '修改成功！';
      } else {
        result.code = 0;
        result.msg = '修改失败！';
      }
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
  async delClassify(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.delete('classify', form);
      result.code = 20000;
      result.msg = '删除成功！';
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = ClassifyService;
