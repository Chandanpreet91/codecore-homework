const faker = require("faker");
exports.seed = function(knex) {
  // Deletes ALL existing entries
 return knex("cohorts")
 .del()
 .then(() => {
   const cohorts = Array.from({length:100}).map(() => {
     return {
       name: faker.commerce.department(),
       logo_url:faker.image.imageUrl(),
       members:faker.name.findName(),
       createdAt:faker.date.future()
     }
   
 })
 return knex("cohorts").insert(cohorts);
    });
};
