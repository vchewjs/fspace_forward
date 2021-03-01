const router = require("koa-router")();

const controller = require("../../app/controller/onek");

router.prefix("/api");

router.post("/getMergeNumber", controller.getMergeNumber);

module.exports = router;
