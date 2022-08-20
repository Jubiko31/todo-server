module.exports = (app) => {
  // eslint-disable-next-line global-require
  const taskController = require('../controllers');
  // eslint-disable-next-line global-require
  const router = require('express').Router();

  router.route('/')
    .post(taskController.addNewTask)
    .get(taskController.getAll);

  router.route('/:id')
    .delete(taskController.deleteTask)
    .patch(taskController.updateTask);

  app.use('/todos', router);
};
