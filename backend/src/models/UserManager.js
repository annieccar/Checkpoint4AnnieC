const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  findByEmail(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ]);
  }

  insert({ username, email, hashedPassword }) {
    return this.database.query(
      `insert into ${this.table} (user_name, email, password) values (? , ? , ?)`,
      [username, email, hashedPassword]
    );
  }

  //   update(item) {
  //     return this.database.query(
  //       `update ${this.table} set title = ? where id = ?`,
  //       [item.title, item.id]
  //     );
  //   }
}

module.exports = UserManager;
