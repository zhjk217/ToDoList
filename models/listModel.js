const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/Todo";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("連線成功");
});

const listSchema = new mongoose.Schema({
title: String,
msg: String,
status: Boolean
});

//使用mongoose中Schema的set()方法
listSchema.set('collection', 'list');

const model = mongoose.model('list', listSchema);
module.exports = model;