const { User, Goal } = require("../models");

async function create(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.redirect("/signup?error=must include username and password");

    const user = await User.create({ username, password });

    if (!user) return res.redirect("/signup?error=error creating new user");

    req.session.isLoggedIn = true;
    req.session.save(() => res.redirect("/"));
  } catch (err) {
    console.log(err);
    return res.redirect(`/signup?error=${err.message}`);
  }
}

// Renders the edit post page
async function editGoal(req, res) {
  try {
    const goalId = req.params.id
    let [goal] = await Promise.all([
      Goal.findById(goalId).lean()
    ])

    res.render('set-goal', {goal/*, isLoggedIn: req.session.isLoggedIn*/})  

  } catch(err) {
    res.status(500).send(err.message)
  }
}

module.exports = { create, editGoal };
