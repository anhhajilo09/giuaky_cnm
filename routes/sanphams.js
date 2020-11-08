var express = require('express');
var router = express.Router();
var sanphamsService = require('../services/sanphams');

//lấy tất cả
router.get('/', function(req, res, next) {
    sanphamsService.getAll().then(data => {
        next({ statusCode: 200, data: data });
    }).catch(err => next(err));
});
//xóa 1
router.delete('/:ma', function(req, res, next) {
    const ma = req.params.ma;
    sanphamsService.delete(ma).then(data => {
        if (data)
            next({ statusCode: 200, message: "Xóa thành công sản phẩm" });
        else
            next({ statusCode: 404, message: "Không tồn tại mã sản phẩm " + ma });
    }).catch(err => next(err));
});
//lấy 1
router.get('/:ma', function(req, res, next) {
    const ma = req.params.ma;
    sanphamsService.getOneById(ma).then(data => {
        if (data)
            next({ statusCode: 200, data: data });
        else
            next({ statusCode: 404, message: "Không tồn tại mã sản phẩm " + ma });
    }).catch(err => next(err));
});

module.exports = router;