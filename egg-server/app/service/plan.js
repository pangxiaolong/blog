'use strict';

const Service = require('egg').Service;
const lodash = require('lodash');
// import { formatDate } from '../utils/utils';
const formatDate = function(str) {
  const a = new Date(str);
  const t1 = a.getFullYear();
  const t2 = a.getMonth() + 1;
  const t3 = a.getDate();
  return t1 + '-' + t2 + '-' + t3;
};

class PlanService extends Service {
  async createPlan(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const item = await this.app.mysql.insert('plan', form);
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

  async queryPlan() {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.select('plan', {
        orders: [['create_time', 'desc']],
      });
      list.forEach(v => v.create_time = formatDate(v.create_time));
      if (list) {
        const arr = lodash.groupBy(list, 'year');
        result.code = 20000;
        result.msg = '查询成功';
        result.data = arr;
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

  async updatePlan(label) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.update('plan', label);
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

  async delPlan(label) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.delete('plan', label);
      result.code = 20000;
      result.msg = '删除成功！';
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
}

module.exports = PlanService;
