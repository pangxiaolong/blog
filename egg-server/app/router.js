'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app; // 获取app中的router对象和controller
  router.get('/', controller.home.index);
  router.post('/user/login', controller.user.login); // 登录
  router.post('/classify/addClassify', controller.classify.addClassify); // 添加分类
  router.get('/classify/getClassify', controller.classify.getClassify); // 查询分类
  router.put('/classify/editClassify', controller.classify.editClassify); // 修改分类
  router.delete('/classify/delClassify', controller.classify.delClassify); // 删除分类
  router.post('/plan/addPlan', controller.plan.addPlan); // 添加计划
  router.get('/plan/getPlan', controller.plan.getPlan); // 查询计划
  router.put('/plan/editPlan', controller.plan.editPlan); // 更新计划
  router.delete('/plan/deletePlan', controller.plan.deletePlan); // 删除计划
  router.post('/note/addNote', controller.note.addNote); // 新建文章
  router.get('/note/getNote', controller.note.getNote); // 查询文章
  router.delete('/note/delNote', controller.note.delNote); // 删除文章
  router.get('/note/statisticsNote', controller.note.statisticsNote); // 统计文章数据
  router.get('/note/groupNote', controller.note.groupNote); // 分组统计文章数据
  router.post('/uploadImg', controller.upload.uploadImg); // 上传图片
};
