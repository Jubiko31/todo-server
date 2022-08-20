const { todos } = require('../models');

exports.addNewTask = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(422);
    return res.send({ answer: 'Task is not defined.' });
  }
  try {
    const newTask = await todos.create(req.body);
    return newTask && (await this.getAll(req, res));
  } catch (error) {
    return res.status(422).send({ answer: error });
  }
};

exports.getAll = async (req, res) => {
  try {
    const all = await todos.findAll();
    res.json(all);
  } catch (err) {
    res.status(422).send({ answer: err });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  if (!id.trim()) {
    res.status(422).send({ answer: 'Invalid id.' });
  }
  todos.destroy({ where: { id } })
    .then(async (removed) => {
      if (removed) {
        return this.getAll(req, res);
      }
      return res.status(404).send({ answer: 'row not found' });
    }).catch((err) => {
      res.status(422).send({ answer: err });
    });
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { task, checked } = req.body;
  const arrayOfErrors = [];
  const valueKeys = {};
  if (!id.trim()) {
    return res.status(422).send({ answer: 'Invalid id.' });
  }
  if (!req.body) {
    res.status(422);
    return res.send({ answer: 'No input.' });
  }
  if (task) {
    if (!task) arrayOfErrors.push('Task cannot be empty.');
    else valueKeys.task = task;
  }
  if (typeof checked === 'boolean') {
    valueKeys.checked = checked;
  }

  if (arrayOfErrors.length) {
    return res.status(422).send({ answer: arrayOfErrors });
  }

  try {
    const [result] = await todos.update(valueKeys, {
      where: { id },
    });
    if (result === 1) {
      return await this.getAll(req, res);
    }
    return res.status(404).send({ answer: 'Instance not found.' });
  } catch (error) {
    return res.status(422).send({ answer: error });
  }
};
