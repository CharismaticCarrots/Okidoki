const router = require('express').Router()
const  {Doki} = require('../db')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const dokis = await Doki.findAll()
    console.log(dokis,'hello')
    res.json(dokis)
  } catch (error) {
    next(error)
  }
})

