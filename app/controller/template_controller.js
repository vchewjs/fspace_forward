/*
 * @Author: liuqi 
 * @Date: 2020-05-28
 * @Description: 电商自定义模板
 */
const page_custom_temp_col = require('../models/page_custom_temp');

// 设置模板
const insertTeamplate = async (ctx, next) => {
  const req = ctx.request.body;
  ctx.status = 200;
  if (!req.temp_name || typeof req.temp_name != 'string' || !req.temp_value || typeof req.temp_value != 'string' || !req.temp_path || typeof req.temp_path != 'string') {
    ctx.status = 401;
    ctx.body = {
      msg: '请求参数有误',
      data: req
    }
    return;
  }

  const result = await page_custom_temp_col.create({
    temp_name: req.temp_name,
    ste_id: req.ste_id,
    temp_path: req.temp_path,
    temp_value: req.temp_value
  });

  ctx.body = {
    msg: '新增成功!',
    data: result
  }
}

// 获取模板
const getTeamplate = async (ctx, next) => {
  // 比对版本号
  
  const req = ctx.request.query;

  const temps = await page_custom_temp_col.find({});
  ctx.status = 200;
  ctx.body = {
    msg: '获取成功',
    temps,
  }
}

// 更新模版
const updataTeamplate = async (ctx, next) => {
  const req = ctx.request.body;
  ctx.status = 200;
  if (!req._id || !req.temp_name || typeof req.temp_name != 'string' || !req.temp_value || typeof req.temp_value != 'string' || !req.temp_path || typeof req.temp_path != 'string') {
    ctx.status = 401;
    ctx.body = {
      msg: '请求参数有误',
      data: req
    }
    return;
  }

  const result = page_custom_temp_col.update({
    temp_name: req.temp_name,
    temp_path: req.temp_path,
    temp_value: req.temp_value
  }, req._id)

  ctx.body = {
    msg: '修改成功',
    result,
  }
}

// 删除模版
const delTeamplate = async (ctx, next) => {
  const req = ctx.request.body;
  ctx.status = 200;
  if (!req._id || !req.temp_name || typeof req.temp_name != 'string' || !req.temp_value || typeof req.temp_value != 'string' || !req.temp_path || typeof req.temp_path != 'string') {
    ctx.status = 401;
    ctx.body = {
      msg: '请求参数有误',
      data: req
    }
    return;
  }

  const result = page_custom_temp_col.deleteOne({
    temp_name: req.temp_name,
    temp_path: req.temp_path,
    temp_value: req.temp_value
  }, req._id)

  ctx.body = {
    msg: '删除成功',
    result,
  }
}

module.exports = {
  getTeamplate,
  insertTeamplate,
  updataTeamplate,
  delTeamplate
}