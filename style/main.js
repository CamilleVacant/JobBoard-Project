$(document).ready(function(){
  $(".toggleBtnLearn").click(function(){
    $(this).parent().parent().find('.toggleInfo').slideToggle('');
    $(this).toggle();
    $(this).parent().find('.toggleBtnHide').toggleClass('toggleBtnHide');
  });

  $(".toggleBtnHide").click(function(){
    $(this).parent().parent().find('.toggleInfo').slideToggle('');
    $(this).toggleClass('toggleBtnHide');
    $(this).parent().find('.toggleBtnLearn').toggle();
  });

  $(".postuler").click(function(){
    $(this).parent().parent().find('.ad_form').slideToggle('');
    $(this).slideToggle();
  });

  $(".cancel").click(function(){
    $(this).parent().parent().parent().slideToggle('');
    $(this).parent().parent().parent().parent().find('.postuler').slideToggle('');
  });

  $(".create").click(function(){
    $('main').slideToggle();
    $('.createForm').slideToggle();
  });

  $(".dropdown-trigger").dropdown();

});
