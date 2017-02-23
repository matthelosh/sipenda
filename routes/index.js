var express = require('express');
var router = express.Router();
var Siswa = require('../model/siswa');
var Komkal = require('../model/dropDown');

router.get('/', function(req, res, next){
  Komkal.find({}, function(err, komkal){
    if(err) return console.log(err);
    if(komkal.length < 1){
      console.log('No Data');
    }else{
      res.render('index', {title: 'Beranda', data: komkal});
    }
    // res.render('index', {title: 'Beranda', content: "Hi, semua! Sudah siap melangkah menuju masa depan?", data: 'komkal'});
  });

});
router.get('/siswa', function(req, res){
    Siswa.aggregate([{
      $lookup:{
        from: "Komkal",
        localField: "komkal",
        foreignField: "_id",
        as: "Jurusan"
      }},
      {
        "$project": {
          "Jurusan": {
            "_id": 0,
            "kode": 0
          }
        }
      }
    ]).exec(function(err, siswas){
      if(err) return console.log(err);
      // console.log(siswas.Jurusan[0].namaKomkal);
      res.render('viewSiswa', {title: "Data Calon PD", data: siswas});
    });
});
router.post('/getKomkal/:id', function(req, res){
  Komkal.find({_id: req.params.id}, function(err, komkal){
    if(err) return console.log(err);

    res.json(komkal);
  });
});

router.post('/siswa', function(req, res, next){
  var th = new Date().getFullYear();
  var date = new Date();
  var num = Number(date);
  var newReg = th + '-' + req.body.kode + '-'+ num;

  //Validation
  Siswa.schema.path('nisn').validate();

  var siswa = new Siswa({
     noReg : newReg,
     nama : req.body.nama,
     nisn : req.body.nisn,
     komkal: req.body.komkal,
     nik: req.body.nik,
     jk: req.body.jk,
     tmptLahir: req.body.tmptLahir,
     tglLahir: req.body.tglLahir,
     agama: req.body.agama,
     alamat: req.body.alamat,
     rt: req.body.rt,
     rw: req.body.rw,
     desa: req.body.desa,
     kec: req.body.kec,
     kodePos: req.body.kodePos,
     kota: req.body.kota,
     domisili: req.body.domisili,
     transportasi: req.body.transportasi,
     hp: req.body.hp,
     email: req.body.email,
     kps: req.body.kps,
     ayah: {
       namaAyah: req.body.namaAyah,
       tglLhrAyah: req.body.tglLhrAyah,
       jobAyah: req.body.jobAyah,
       pendAyah: req.body.pendAyah
     }
  });
   siswa.save(function (err) {
      if (err) return console.log(err);
      assert.equal(err.errors.nisn.message,' NISN Error');

      res.json(siswa);
   });

});

router.get('/siswa/del/:id', function(req, res, next){
  Siswa.findOne({_id: req.params.id}, function(err, siswa){
    if(err) return res.send(err);

    siswa.remove(function(err){
      if(err) return res.ssend(err);

      res.redirect("/siswa");
    });
  });
});

router.get('/siswa/add', function(req, res, next){
  res.render('addSiswa', {title: "Formulir Pendaftaran", action:"/siswa"});
});

router.get('/siswa/detil/:id', function(req, res, next){
  Siswa.findOne({_id: req.params.id}, function(err, siswa){
    if (err) return res.send(err);
    res.render('detil', {title: "Info Detail Calon PD", data: siswa});
  });
});

router.get('/siswa/edit/:id', function(req, res, next){
  Siswa.findOne({_id: req.params.id}, function(err, siswa){
    if(err) return res.send(err);

    res.render('editSiswa', {title: "Update Data Calon PD", data: siswa});
  })
});
router.put('/siswa/:id', function(req, res, net){
  Siswa.findOne({_id: req.params.id}, function(err, siswa){
    if(err) return res.send(err);

    // siswa.
  });
});

router.get('/lastID', function(req, res, next){
  // Siswa.find({}, function(err, siswa){
  //   if (err)  return console.log(err);
  //
  //   res.json(siswa);
  //   // console.log(siswa);
  //
  // }).sort({_id:-1}).limit(1);
  var dataSiswa = getUserId();
  res.send(dataSiswa);
});
module.exports = router;
