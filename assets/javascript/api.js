// ------------------------------
// https://twitter.com/mattsince87
// ------------------------------

alert("This is great");

function scrollNav() {
  $('.nav a').click(function(){  
    //Toggle Class
    $(".active").removeClass("active");      
    $(this).closest('li').addClass("active");
    var theClass = $(this).attr("class");
    $('.'+theClass).parent('li').addClass('active');
    //Animate
    $('html, body').stop().animate({
        scrollTop: $( $(this).attr('href') ).offset().top - 160
    }, 400);
    return false;
  });
  $('.scrollTop a').scrollTop();
}
scrollNav();

//google sign in
$('.login').on('click', function() {
  event.preventDefault();
  var clientId = '478137109323-67523o1tnhd0ol9bndqpvf4ojm1kk1i1.apps.googleusercontent.com';
  var apiKey = 'AIzaSyDBAdHjSdgGLClbiEGBdS2Xcp6Yx27WJPk';
  var queryURL = 'https://www.googleapis.com/auth/calendar';
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {

      var googleLogin = response.data
    });
});