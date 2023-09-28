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

module.exports = CategoryManager;
