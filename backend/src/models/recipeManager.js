const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  findAllByUser(id) {
    return this.database.query(
      `select recipe.id, recipe.title, category.name from recipe join receipe_has_category on receipe_has_category.recipe_id = recipe.id join category on category.id = receipe_has_category.category_id where recipe.user_id =?;`,
      [id]
    );
  }

  //   insert(item) {
  //     return this.database.query(`insert into ${this.table} (title) values (?)`, [
  //       item.title,
  //     ]);
  //   }

  //   update(item) {
  //     return this.database.query(
  //       `update ${this.table} set title = ? where id = ?`,
  //       [item.title, item.id]
  //     );
  //   }
}

module.exports = RecipeManager;
