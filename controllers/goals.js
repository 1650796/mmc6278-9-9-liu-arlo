const { Goal } = require("../models");

//get all goals
async function getAll(req, res) {
    try {
        const mongoQuery = {}
        const allGoals = await Goal
      .find(mongoQuery)
      .sort({createdAt: 'DESC'})
      
    const goals = allGoals.map(goal => {
      goal = goal.toObject()
      goal.createdAt = new Date(goal.createdAt).toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
      return goal
    })
    res.render('goals', {
      goals,
      isLoggedIn: req.session.isLoggedIn,
    })

    } catch (err) {
        res.status(500).send(err.message)
    }
}

//get single goal by id
async function get(req, res) {
    try {
        const goal = await Goal.findById(req.params.id)
        res.status(200).send(goal)

    } catch (err) {
        res.status(500).send(err.message)
    }
}

//set a new goal
async function create(req, res, next) {
    try {
      const {title, description} = req.body

      if (!( title || description ))
        return res
          .status(400)
          .send('Must include a goal title and goal description.')

      const goal = await Goal.create({title, description})
      res
        .status(200)
        .redirect('/goals')
      
    } catch (err) {
      res.status(500).send('Error creating goal: ' + err.message)
    }
    
  }

//update a goal
async function update(req, res) {
    try {
      const {title, description} = req.body
      const goalId = req.params.id

      if (!( title || description))
        return res
          .status(400)
          .send('Must include a goal title and goal description.')

      const goal = await Goal.findByIdAndUpdate(goalId, {title, description})
      //res.render('updated', {goal, isLoggedIn: req.session.isLoggedIn})
      //res.json(goal)
      return res.render('updated', {goal})
  
    } catch(err) {
      res.status(500).send(err.message)
    }
  }

  //delete a goal
  async function remove(req, res, next) {
    try {
      const goalId = req.params.id
      const goal = await Goal.findByIdAndDelete(goalId)

      if (!goal) return res.status(404).send('Goal not found, please try again.')
        
      return res.render('goals', {goal})
  
    } catch (err) {
      res.status(500).send('Error deleting goal: ' + err.message)
    }
  }
  

  module.exports = 
  {
    getAll,
    get,
    create,
    update,
    remove
  }

  