'use strict';

const Controller = require('egg').Controller;

class PlanController extends Controller {
  async addPlan() {
    const form = this.ctx.request.body;
    const result = await this.ctx.service.plan.createPlan(form);
    this.ctx.body = result;
  }

  async getPlan() {
    const result = await this.ctx.service.plan.queryPlan();
    this.ctx.body = result;
  }

  async editPlan() {
    const form = this.ctx.request.body;
    const result = await this.ctx.service.plan.updatePlan(form);
    this.ctx.body = result;
  }

  async deletePlan() {
    const form = this.ctx.request.query; // TODO 参数为空的判断
    const result = await this.ctx.service.plan.delPlan(form);
    this.ctx.body = result;
  }
}

module.exports = PlanController;
