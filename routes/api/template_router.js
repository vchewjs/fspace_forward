const router = require("koa-router")();

const controller = require("../../app/controller/template_controller");

router.prefix("/api/page");

router.post("/insertTeamplate", controller.insertTeamplate);

router.post("/delTeamplate", controller.delTeamplate);

router.post("/updataTeamplate", controller.updataTeamplate);
  
router.post("/getTemplate", controller.getTeamplate);

module.exports = router;
