const grpc = require('grpc');
const model = require('./model');
// load proto file
const filmProto = grpc.load('film.proto');

// tạo server gRPC
const server = new grpc.Server();
// ta định nghĩa các service trong file film.proto
server.addService(filmProto.FilmService.service, {
  // định nghĩa cho method list của service FilmService
  list: (_, callback) => {
    try {
      // sử dụng knex để trả về list film
      model.knexObj.select(
        'title',
        'description',
        'release_year',
        'language_id',
        'rental_duration',
        'rental_rate',
        'length',
        'replacement_cost',
        'rating',
        'special_features'
      ).from('film').then(rows => {

        callback(null, rows);
      })
    } catch (error) {
      console.error(error);
    }
  },
  // định nghĩa cho method get của service FilmService
  get: (call, callback) => {
    try {
      // sử dụng knex để trả về film theo id
      model.knexObj.select(
        'title',
        'description',
        'release_year',
        'language_id',
        'rental_duration',
        'rental_rate',
        'length',
        'replacement_cost',
        'rating',
        'special_features'
      )
        .from('film')
        .where('film_id', call.request.id)
        .then(rows => {
          callback(null, rows[0]);
        })
    } catch (error) {
      console.error(error);
    }
  },
  // định nghĩa cho method create của service FilmService
  create: (call, callback) => {
    try {
      // sử dụng knex để tạo film
      // call.request tương đương với req message trong rest api
      model.knexObj('film')
        .insert({
          title: call.request.title,
          description: call.request.description,
          release_year: call.request.release_year,
          language_id: call.request.language_id,
          rental_duration: call.request.rental_duration,
          rental_rate: call.request.rental_rate,
          length: call.request.length,
          replacement_cost: call.request.replacement_cost,
          rating: call.request.rating,
          special_features: call.request.special_features
        })
        .then(rows => {
          const result = { rows: 'created at: ' + rows };
          // callback là tương đương res message trong rest api
          callback(null, result);
        })
    } catch (error) {
      console.error(error);
    }
  },
  // định nghĩa cho method update của service FilmService
  update: (call, callback) => {
    try {
      // sử dụng knex để update film theo id
      model.knexObj('film')
        .update({
          title: call.request.title,
          description: call.request.description,
          release_year: call.request.release_year,
          language_id: call.request.language_id,
          rental_duration: call.request.rental_duration,
          rental_rate: call.request.rental_rate,
          length: call.request.length,
          replacement_cost: call.request.replacement_cost,
          rating: call.request.rating,
          special_features: call.request.special_features
        })
        .where('film_id', call.request.film_id)
        .then(rows => {
          const result = { rows: 'updated at: ' + rows };
          callback(null, result);
        })
    } catch (error) {
      console.error(error);
    }
  },
  // định nghĩa cho method delete của service FilmService
  delete: (call, callback) => {
    try {
      // sử dụng knex để xóa film theo id
      model.knexObj('film')
        .where('film_id', call.request.id)
        .del()
        .then(rows => {
          const result = { rows: 'deleted at: ' + rows };
          callback(null, result);
        })
    } catch (error) {
      console.error(error);
    }

  }
})
server.bind('127.0.0.1:4000', grpc.ServerCredentials.createInsecure());
console.log('Server running at http://127.0.0.1:4000');
server.start();