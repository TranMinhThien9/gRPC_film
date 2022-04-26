const grpc = require('grpc');
const PROTO_PATH = './film.proto';
const filmService = grpc.load(PROTO_PATH).FilmService;
const client = new filmService('127.0.0.1:4000', grpc.credentials.createInsecure());
module.exports = client 