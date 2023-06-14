const db = require('./db');
const helper = require('../helper');
const config = require('../config');


// Fonction getAll
async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, status
    FROM tasks LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


// Fonction CREATE
async function create(task){
    const result = await db.query(
      `INSERT INTO tasks 
      (name, status) 
      VALUES 
      (${task.name}, ${task.status})`
    );
  
    let message = 'Erreur dans la création de la tâche';
  
    if (result.affectedRows) {
      message = 'Tâche ajoutée avec succés';
    }
  
    return {message};
  }


  // Fonction UPDATE
  async function update(id, task){
    const result = await db.query(
      `UPDATE tasks
      SET name="${task.name}", status=${task.status}
      WHERE id=${id}` 
    );
  
    let message = 'Erreur lors de la modification de la tâche';
  
    if (result.affectedRows) {
      message = 'La modification de la tâche à bien été prise en compte';
    }
  
    return {message};
  }


  // Function DELETE
  async function remove(id){
    const result = await db.query(
      `DELETE FROM tasks WHERE id=${id}`
    );
  
    let message = 'Erreur lors de la suppression de la tâche';
  
    if (result.affectedRows) {
      message = 'La tâche a bien été supprimée';
    }
  
    return {message};
  }
module.exports = {
    getMultiple,
    create,
    update,
    remove
  }