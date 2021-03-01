const router = require("koa-router")();

const controller = require("../../app/controller/forwarded_controller");

router.prefix("/api");

/* 接口转发 */
router.post("/forwarded", controller.forwarded);

/** 兼容旧版本 */
router.post("/forwardedHistory", controller.forwardedHistory);

module.exports = router;
