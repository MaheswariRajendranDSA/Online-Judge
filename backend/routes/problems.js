const express = require('express')
const Problem = require('../models/ProblemModels')
const requireAuth = require('../middleware/requireAuth')
const {
  getProblems,
  getSingleProblemById,
  createProblemById,
  createNewProblemById
} = require('../controllers/problemControllers')
const router = express.Router()

router.use(requireAuth)
// GET all workouts
router.get('/getProblems', getProblems)

// GET a single workout
router.get('/getSingleProblemById/:id', getSingleProblemById);
//router.get('/getProblemBySerialNo/:no', getProblemBySerialNo);

// POST a new workout
router.post('/createProblemById/run', createProblemById);

// POST a new workout
router.post('/createNewProblemById/run', createNewProblemById);
/*
router.post('/', async (req, res) => {
    const {
        serial_no,title,
        description,
        languages,
        difficulty,
        test_case
    } = req.body
  
    try {
      const problem = await Workout.create({  serial_no,title,
        description,
        languages,
        difficulty,
        test_cases
    })
      res.status(200).json(problem)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  })

// DELETE a workout
router.delete('/:id', (req, res) => {
  res.json({mssg: 'DELETE a new problem'})
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
  res.json({mssg: 'UPDATE a problem'})
})*/

module.exports = router