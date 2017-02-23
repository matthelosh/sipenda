var mongoose = require('mongoose');
var komkalSchema = new mongoose.Schema({
  namaKomkal : String,
  kode: String,
  // siswa: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Siswa'}]
});

var Komkal = mongoose.model('Komkal', komkalSchema, 'Komkal');
module.exports = Komkal;
