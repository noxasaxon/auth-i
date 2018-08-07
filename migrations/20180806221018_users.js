exports.up = function(knex, Promise) {
  //create the users table
  return knex.schema.createTable('users', function(tbl) {
    tbl.increments(); //creates id

    tbl
      .string('name', 250)
      .notNullable()
      .defaultTo('');

    tbl
      .string('password', 250)
      .notNullable()
      .defaultTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
