const express = require('express');
const router = express.Router();
const task = require('../services/task');

/* GET Task */
router.get('/tasks', async function(req, res, next) {
  try {
    res.json(await task.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Erreur obtention tâches `, err.message);
    next(err);
  }
});

/* POST Task */
router.post('/task', async function(req, res, next) {
    try {
      res.json(await task.create(req.body));
    } catch (err) {
      console.error(`Erreur lors de la création de la tâche`, err.message);
      next(err);
    }
  });

/* PUT Task */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await task.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Erreur lors de la modification de la tâche`, err.message);
      next(err);
    }
  });

/* DELETE Task */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await task.remove(req.params.id));
    } catch (err) {
      console.error(`Erreur lors de la suppression de la tâche`, err.message);
      next(err);
    }
  });

module.exports = router;
