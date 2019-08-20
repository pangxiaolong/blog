'use strict';

const Controller = require('egg').Controller;

class NoteController extends Controller {

  async addNote() {
    const {
      ctx,
    } = this;
    const form = ctx.request.body;
    const result = await ctx.service.note.createNote(form);
    ctx.body = result;
  }
  async getNote() {
    const {
      ctx,
    } = this;
    const form = ctx.request.query;
    console.log(form);
    const result = await ctx.service.note.queryNote(form);
    ctx.body = result;
  }
  async delNote() {
    const form = this.ctx.request.query;
    const result = await this.ctx.service.note.delNote(form);
    this.ctx.body = result;
  }
  async statisticsNote() {
    const result = await this.ctx.service.note.statisticsNote();
    this.ctx.body = result;
  }
  async groupNote() {
    const result = await this.ctx.service.note.groupNote();
    this.ctx.body = result;
  }
}

module.exports = NoteController;
