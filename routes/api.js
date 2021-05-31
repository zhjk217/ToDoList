var express = require('express');
var router = express.Router();
var listModel = require('../models/listModel.js');
//var allList = []; //存放所有待辦事項
//var id = 1; //紀錄待辦事項的索引值
router.post('/addList', function (req, res) {
    var newTodo = new listModel({
        //"id": id,
        "title": req.body.title,
        "msg": req.body.msg,
        "status": false
    });
    //allList.push(newTodo);
    //id++;
    /*res.json({
        "status": 0,
        "msg": "success",
        "data": newTodo
    });*/
    newTodo.save(function (err, data) {
        if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
            console.log("新增失敗");
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
            console.log("新增成功");
        }
    })
});
router.post('/updateList', function (req, res) {
    var id = req.body.id;
    listModel.findById(id, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            data.title = req.body.title;
            data.msg = req.body.msg;
            data.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({
                        "status": 1,
                        "msg": "error"
                    });
                } else {
                    res.json({
                        "status": 0,
                        "msg": "修改成功"
                    });
                }
            });
        }
    });
});
router.post('/removeList', function (req, res) {
    var id = req.body.id;
    listModel.remove({
        _id: id
    }, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            console.log("刪除成功");
            res.json({
                "status": 0,
                "msg": "success",
                "data":data
            });
        }
    });
});
router.post('/checkStatus', function (req, res) {
    var id = req.body.id;
    listModel.findById(id, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            if (data.status) {
                data.status = false;
            } else {
                data.status = true;
            }
            data.save(function (err) {
                if (err) {
                    console.log(err);
                    res.json({
                        "status": 1,
                        "msg": "error"
                    });
                } else {
                    res.json({
                        "status": 0,
                        "msg": "修改成功"
                    });
                }
            });
        }
    });
});
router.get('/getList', function (req, res) {
    listModel.find(function (err, data) {
        if (err) console.log(err);
        res.json(data);
    });
});
module.exports = router;