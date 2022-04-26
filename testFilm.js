//TESTING



const client = require('./client')

// client.list({}, (error, actors) => {
//     if (!error) {
//         console.log('Fetch list of film successfully!')
//         console.log(actors)
//     } else {
//         console.error(error)
//     }
// });

// client.get({ id: 44 }, (error, film) => {
//     if (!error) {
//         console.log('Fetch film successfully!')
//         console.log(film)
//     } else {
//         console.error(error)
//     }
// });

client.create({

  title: "test",
  description: "call.request.description",
  release_year: 2022,
  language_id: 2,
  rental_duration: 1,
  rental_rate: "3.88",
  length: 128,
  replacement_cost: "12.99",
  rating: "",
  special_features: ""
}, (error, film) => {
  if (!error) {
    console.log('Create film successfully!')
    console.log('affected rows: ' + film.rows)
  } else {
    console.error(error)
  }
});

// client.update({ first_name: "Nguyen", last_name: "Huy", actor_id: "22" }, (error, film) => {
//     if (!error) {
//         console.log('Update film successfully!')
//         console.log('affected rows: ' + film.rows)
//     } else {
//         console.error(error)
//     }
// });