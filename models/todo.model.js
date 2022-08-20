module.exports = (sequelize, Sequelize) => {
  const todos = sequelize.define(
    'todos',
    {
      task: {
        type: Sequelize.STRING,
      },
      checked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    },
  );
  return todos;
};
