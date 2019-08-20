'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');

class UploadController extends Controller {
  async uploadImg() {
    const {
      ctx,
    } = this;
    const file = ctx.request.files[0];
    if (!file) return ctx.throw(404);
    const timestamp = Date.parse(new Date());
    const filename = timestamp + '_' + file.filename;
    const targetPath = path.join(this.config.baseDir, 'app/public', filename);
    const source = fs.createReadStream(file.filepath);
    const target = fs.createWriteStream(targetPath);

    try {
      await pump(source, target);
    } finally {
      await ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 20000,
      data: 'http://127.0.0.1:7001/public/' + filename,
      message: '上传成功',
    };
  }
}

module.exports = UploadController;
