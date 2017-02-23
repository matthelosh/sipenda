var mongoose = require('mongoose');
var siswaSchema = new mongoose.Schema({
    noReg : String,
    komkal : [{type: mongoose.Schema.Types.ObjectId, ref: 'Komkal'}],
    nisn: {
      type: Number,
      required: true
    },
    nama: {
      type: String,
      required: true
    },
    nik: {
      type: Number,
      required: true
    },
    jk: {
      type: String,
      required: true
    },
    tmptLahir: {
      type: String,
      required: true
    },
    tglLahir: {
      type: Date,
      required: true
    },
    agama: {
      type: String,
      required: true
    },
    alamat: {
      type: String,
      required: true
    },
    rt: String,
    rw: String,
    desa: {
      type: String,
      required: true
    },
    kec: {
      type: String,
      required: true
    },
    kodePos: String,
    kota: {
      type: String,
      required: true
    },
    domisili: {
      type: String,
      required: true
    },
    transportasi: {
      type: String,
      required: true
    },
    hp: String,
    email: String,
    kps: String,
    ayah: {
        namaAyah: {
          type: String,
          required: true
        },
        tglLhrAyah: {
          type: Date,
          required: true
        },
        pendAyah: String,
        jobAyah: String,
        hasilAyah: Number
    },
    ibu: {
        namaIbu: {
          type: String,
          required: true
        },
        tglLhrIbu: {
          type: Date,
          required: true
        },
        pendIbu: String,
        jobIbu: String,
        hasilIbu: Number
    },
    wali: {
        namaWali: String,
        hubWali: String,
        tglLhrWali: Date,
        pendWali: String,
        jobWali: String,
        hasilWali: Number
    },
    akademik: {
        asalSekolah: {
          type: String,
          required: true
        },
        statSekolah: {
          type: String,
          required: true
        },
        thLulus: {
          type: String,
          required: true
        },
        noUn: {
          type: String,
          required: true
        },
        noIjazah: String,
        noSkhun: String,
        nilai: {
            bid1: Number,
            bid2: Number,
            bid3: Number,
            bid4: Number,
            bid5: Number,
            bidRt: Number,
            bidUn: Number,
            bidNa: Number,
            mtk1: Number,
            mtk2: Number,
            mtk3: Number,
            mtk4: Number,
            mtk5: Number,
            mtkRt: Number,
            mtkUn: Number,
            mtkNa: Number,
            ipa1: Number,
            ipa2: Number,
            ipa3: Number,
            ipa4: Number,
            ipa5: Number,
            ipaRt: Number,
            ipaUn: Number,
            ipaNa: Number,
            en1: Number,
            en2: Number,
            en3: Number,
            en4: Number,
            en5: Number,
            enRt: Number,
            enUn: Number,
            enNa: Number
        }
    }
});
var Siswa = mongoose.model('Siswa', siswaSchema);
module.exports = Siswa;
