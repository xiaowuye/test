module.exports = function () {
    this.set("Content-Type", "application/json");
    var result = {
            "success": 1,
            "value": {
                "mobile": "180****0000",
                "name": "测试上线啦"
            }
        };
    // {"success": 0, errCode: 10003, "message": "登录用户不存在"}
    this.response.body = JSON.stringify(result);
};
