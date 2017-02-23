$(window).load(function(){
  $(".se-pre-con").fadeOut("slow");
});

$(document).ready(function(){
  $(".menuTrigger").on("click", function(e){
    e.preventDefault();
    $(this).toggleClass("triggerActive");

    $("#menuSisi").toggleClass("show");
  });

  $("#frmAddSiswa .form-control").prop("disabled", true);
  $(".btnNav").click(function(){
    go(this);
  });

  $("#preKomkal").on("change", function(){
    var id  = $(this).val();
    $.ajax({
      // var id: $("#preKomkal").val();
      type: 'post',
      url: '/getKomkal/'+id,
      success: function(msg){
        $.each(msg, function(){
          $("#kode").val(this.kode);
        })
      }
    });
  });


  function go(el){
    // el.preventDefault();
  // $(".btnNav").click(function(){
    var url = $(el).attr("href");
    $('html, body').animate({
      scrollTop: $(url).offset().top
    }, 2000);
  // });
  }
  $("#frmDepan").submit(function(e){
    e.preventDefault();
    return false;
  });
  $("#goToDaftar").click(function(e){
    e.preventDefault();
    var komkal = $("#preKomkal").val();
    var nama = $("#preNama").val();
    // var kode =
    // noReg = tttt-komkal-no_urut (2017-mm-121)
    var th = new Date().getFullYear();

    if(komkal == "0"){
      alert('Pilih Jurusan Dulu');
      $("#preKomkal").focus();
      return false;
    }else if(Number(nama) || nama == ""){
      alert('Nama Harus Diisi dengan Benar');
      $("#preNama").focus();
      return false;
    }else{
      $("#komkal").val(komkal);
      $("#nama").val(nama);
      $("#frmAddSiswa .form-control").not($("#kps")).prop("disabled", false);
      go(this);
      $("#nama").focus();
    }

    // var newReg = th+'-'+komkal+'-'+lastID;
  });

  $("#frmAddSiswa").submit(function(e){
    e.preventDefault();
    // alert('hi');

    // Validate Form

    var data = $(this).serialize()
    $.ajax({
      method: 'post',
      url: '/siswa',
      data: data,
      success: function(msg){

        $("#modal-text").html('<p>'+msg.nama+'! Anda telah terdata dengan: </p><h3>No. Registrasi: <b>'+msg.noReg+'</b></h3><br><p>Silahan catat no. tersebut untuk kepentingan lebih lanjut.</p>');
        $("#modalDaftar").modal();
        // window.location.href = '/';

      }

    });
  });

// on hidden modal

  $("#modalDaftar").on('hidden.bs.modal', function(){
    window.location.href='/';
  });

// Print Data Calon PD

  $("#printDiv").click(function(){
    var printContent = $(".table-page").html();
    var oriContent = $('body').html();

    $('body').html('<head><link rel="stylesheet" media="print" href="/static/css/cetak.css"></head><body>'+printContent+'</body>');
    window.print();

    $('body').html(oriContent);
  });

  $('#isKps').click(function(){
    $("#kps").toggleDisabled();
  });


  (function($) {
    $.fn.toggleDisabled = function() {
      return this.each(function(){
        this.disabled = !this.disabled;
      });
    };
  })(jQuery);

  $(".panel-body fieldset").each(function(e){
    if(e !=0)
      $(this).hide();
  });


  $("#next").click(function(){

    // console.log(fSet.length);
    var form = $("#frmAddSiswa");
      form.validate({
        rules: {
          nisn: {
            required: true,
            minlength: 10,
            number: true,
          },
          nik:{
            required: true,
            minlength: 16,
            number: true,
          },
          hp: {
            required: false,
            minlength: 10,
            number: true,
          },

        },
        messages: {
          nisn: {
            required: "NISN harus diisi",
            minlength: "Karakter yang dimasukkan kurang dari 10",
            number: "Harus diisi angka",
          },
          nik:{
            required: "Harus diisi, lihat di Kartu Keluarga (KK)",
            number: "Tidak boleh ada huruf",
            minlength: "Nomor NIK kurang",
          },
          jk:{
            required: "Jenis Kelamin harus diisi",
          },
          // tmptLahir: {
          //   required: "Tempat Lahir harus diisi",
          // },
          tglLahir:{
            required: "Tanggal Lahir Harus Diisi",
          },
          alamat: {
            required: "Harus Diisi",
          },
          desa: {
            required: "Desa Harus Harus Diisi",
          },
          kec: {
            required: "Kecamatan Harus Diisi",
          },
          kota: {
            required: "Kota / Kabupaten Harus Diisi",
          },
        }
      });
      if(form.valid() == true){
        if($(".panel-body fieldset:visible").next().length != 0)
          $(".panel-body fieldset:visible").next().show('slow').prev().hide('slow');
        else{
          $(".panel-body fieldset:visible").hide();
          $(".panel-body fieldset:first").show();
        }
        return false;
      }
    });
    // if($(".panel-body fieldset:visible").next().length != 0)
    //   $(".panel-body fieldset:visible").next().show('slow').prev().hide('slow');
    // else{
    //   $(".panel-body fieldset:visible").hide();
    //   $(".panel-body fieldset:first").show();
    // }
    // return false;

  // });
  $("#prev").click(function(){
    if($(".panel-body fieldset:visible").prev().length != 0)
      $(".panel-body fieldset:visible").prev().show('slow').next().hide('slow');
    else{
      $(".panel-body fieldset:visible").hide();
      $(".panel-body fieldset:last").show();
    }
    return false;
  });


});



$(window).scroll(function(){
  var wScroll = $(this).scrollTop();
  // console.log(wScroll);
  var wHeight = $(this).height();
  if(wScroll > $('#panelPribadi').offset().top - wHeight / 1.2) {
    setTimeout(function(){
      $("#panelPribadi").addClass('panel-show');
    // }, 500);
      $("#panelPribadi .form-group").each(function(i){
        setTimeout(function(){
          $("#panelPribadi .form-group").eq(i).addClass('is-showing');
        }, 150 * (i+1));
      });
    }, 600);
  }
  if(wScroll >= $("#frmDaftar").offset().top){

    $("#frmDaftar").css({
      'background-size': wScroll/6+'%',
      'background-position': 'center top'
    });
    if($("#preNama").val()=="" || $("#preKomkal").val()=="0"){
      $(".noName").fadeIn();
    }else{
      $(".noName").fadeOut();
    }
  }


});
