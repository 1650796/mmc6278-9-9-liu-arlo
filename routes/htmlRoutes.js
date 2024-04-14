const router = require("express").Router();
const controllers = require("../controllers");
const checkAuth = require("../middleware/auth");

router.get("/", ({ session: { isLoggedIn } }, res) => {
  res.render("index", { isLoggedIn });
});

router.get("/login", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("login", { error: req.query.error });
});

router.get("/signup", async (req, res) => {
  if (req.session.isLoggedIn) return res.redirect("/");
  res.render("signup", { error: req.query.error });
});

router.get("/private", checkAuth, ({ session: { isLoggedIn } }, res) => {
  res.render("protected", { isLoggedIn });
});


//Goal Routes
//get all goals
router.get('/goals', checkAuth, controllers.goals.getAll)

//get specific goal by id
router.get('/goals/:id', checkAuth, controllers.goals.get)

//editing a goal
router.get("/edit-goal/:id", checkAuth, controllers.user.editGoal)

//router.get("/", checkAuth, controllers.quote.getApi)

module.exports = router;
