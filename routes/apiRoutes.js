const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

// admin login/logout
router.post("/login", controllers.auth.login);
router.get("/logout", controllers.auth.logout);
router.post("/signup", controllers.user.create);


//Goal Routes
router.post(
  '/goals',
  checkAuth,
  controllers.goals.create
);

router
  .route('/goals/:id')
  //update goal
  .put(checkAuth, controllers.goals.update) 
  //delete goal
  .delete(checkAuth, controllers.goals.remove);
  
router.get(
  '/',
  checkAuth,
  controllers.quote.getApi
  );

module.exports = router;
