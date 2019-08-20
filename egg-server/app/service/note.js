'use strict';

const Service = require('egg').Service;
const formatDate = function(str) {
  const a = new Date(str);
  const t1 = a.getFullYear();
  const t2 = a.getMonth() + 1;
  const t3 = a.getDate();
  return t1 + '-' + t2 + '-' + t3;
};
class NoteService extends Service {
  async createNote(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const item = await this.app.mysql.insert('article', form);
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
  async queryNote(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      let list = null;
      let totalSum = null;
      if (form.page) {
        const sort = {};
        if (form.sort === '1') {
          sort.orders = [
            [ 'create_time', 'desc' ],
          ]; // 排序方式
        } else {
          sort.orders = [
            [ 'visited', 'desc' ],
          ];
        }
        console.log(sort);
        list = await this.app.mysql.select('article', {
          limit: 10, // 返回数据量
          offset: form.page * 10, // 数据偏移量
          ...sort });
        totalSum = await this.app.mysql.query('SELECT COUNT(*) as total FROM article');
      } else {
        list = await this.app.mysql.select('article');
      }
      for (const i of list) {
        const classItem = await this.app.mysql.select('classify', {
          where: {
            id: i.classify_id,
          }, // WHERE 条件
          columns: [ 'name' ], // 要查询的表字段
        });
        i.classifyName = classItem[0].name;
        i.create_time = formatDate(i.create_time);
      }
      if (list) {
        result.code = 20000;
        result.msg = '查询成功';
        if (form.page) {
          result.data = {
            list,
            total: totalSum[0].total,
          };
        } else {
          result.data = list;
        }
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
  async delNote(form) {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const list = await this.app.mysql.delete('article', form);
      result.code = 20000;
      result.msg = '删除成功！';
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
  async statisticsNote() {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const sumObj = await this.app.mysql.query('select count(*) as sumNote, sum(visited) as visited,sum(comment) as comment from `article`');
      result.data = sumObj[0];
      result.code = 20000;
      result.msg = '查询成功！';
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
  async groupNote() {
    const result = {
      code: 20000,
      data: {},
    };
    try {
      const sumObj = await this.app.mysql.query('SELECT classify_id,count(*) as value FROM `article` GROUP BY classify_id');
      for (const v of sumObj) {
        const classifyName = await this.app.mysql.get('classify', {
          id: v.classify_id,
        });
        v.name = classifyName.name;
      }
      result.data = sumObj;
      result.code = 20000;
      result.msg = '查询成功！';
      return result;
    } catch (error) {
      this.ctx.status = 500;
      throw (error);
    }
  }
}
module.exports = NoteService;
