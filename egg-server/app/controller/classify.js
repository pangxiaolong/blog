'use strict';

const Controller = require('egg').Controller;

class ClassifyController extends Controller {
  async addClassify() {
    const form = this.ctx.request.body;
    const result = await this.ctx.service.classify.createClassify(form);
    this.ctx.body = result;
  }
  async getClassify() {
    const result = await this.ctx.service.classify.queryClassify();
    this.ctx.body = result;
  }
  async editClassify() {
    const form = this.ctx.request.body;
    const result = await this.ctx.service.classify.updateClassify(form);
    this.ctx.body = result;
  }
  async delClassify() {
    const form = this.ctx.request.query; // TODO 参数为空的判断
    const result = await this.ctx.service.classify.delClassify(form);
    this.ctx.body = result;
  }
}

module.exports = ClassifyController;
