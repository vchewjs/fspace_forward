const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const pageCustomTemp = new Schema({
  // 页面模板名称
  temp_name: {
    type: String,
    required: true
  },
  // 页面模板路径
  temp_path: {
    type: String,
    required: true
  },
  temp_value: {
    type: String,
    required: true
  }
}, { collection: 'page_custom_temp', versionKey: false});

module.exports = mongoose.model('page_custom_temp', pageCustomTemp);