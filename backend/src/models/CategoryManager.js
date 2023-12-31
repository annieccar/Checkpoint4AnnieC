const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" });
  }

  findAllByUser(id) {
    return this.database.query(
      `select * from  ${this.table} where user_id = ?`,
      [id]
    );
  }

  findAllByRecipe(id) {
    return this.database.query(
      `select category.id, category.name from category join receipe_has_category on category.id = receipe_has_category.category_id where receipe_has_category.recipe_id = ?`,
      [id]
    );
  }

  insert({ name, userId }) {
    return this.database.query(
      `insert into ${this.table} (name, user_id) values (? , ?)`,
      [name, userId]
    );
  }
}

module.exports = CategoryManager;
