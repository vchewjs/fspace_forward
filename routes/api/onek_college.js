const router = require("koa-router")();

const controller = require("../../app/controller/onek_college");

router.prefix("/api");

router.post("/mkdirSync", controller.mkdirSync);

module.exports = router;
