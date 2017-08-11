<<<<<<< HEAD
$(document).foundation();
var elem = new Foundation.Orbit($(".orbit"), {});

var currentUser;


=======
>>>>>>> master
var userName;
var user;
var config = {
  apiKey: "AIzaSyDBAdHjSdgGLClbiEGBdS2Xcp6Yx27WJPk",
  authDomain: "homemate-94bde.firebaseapp.com",
  databaseURL: "https://homemate-94bde.firebaseio.com",
  projectId: "homemate-94bde",
  storageBucket: "homemate-94bde.appspot.com",
  messagingSenderId: "478137109323"
};

firebase.initializeApp(config);

var userData = firebase.database().ref();

//LogInUser
$("#logInModal.reveal").on("click", "#logInUser", function(event) {
  const email = $("#logInEmail").val().trim();
  const password = $("#password").val().trim();
  const auth = firebase.auth();
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorMessage) {
      $("#logInModal.reveal .errorMessage").html("<p>" + errorMessage + "</p>");
    }
    $('#logInModal.reveal').foundation('open');
  });
  $('#logInModal.reveal').foundation('close');
});

//Register a new user
$("#registerModal.reveal").on("click", "#submitUser", function(event) {
  const firstName = $("#firstname").val().trim();
  const lastName = $("#lastname").val().trim();
  const email = $("#email").val().trim();
  const password1 = $("#password1").val().trim();
  const password2 = $("#password2").val().trim();

  if (password1 != password2) {
    $("#registerModal.reveal .errorMessage").html("<p>Passwords did not match</p>");
    $('#registerModal.reveal').foundation('open');
    return;
  }

  userName = firstName;

  const auth = firebase.auth();
  auth.createUserWithEmailAndPassword(email, password1).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  var newUserRef = userData.push();
  newUserRef.set({
    postId: newUserRef.key,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password1
  });
});


$("#logOutModal.reveal").on("click", "#logOutUser", function(event) {
  console.log('here');
  firebase.auth().signOut();
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    user.updateProfile({
      displayName: userName,
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
    console.log(user.displayName);
    console.log(user);
    $('.menu .signInBtn').removeClass('button');
    $('.menu .signInBtn').removeAttr('data-open');
    $('.menu .signOutBtn').removeClass('hide');
    $('.menu .signInBtn').text("Hello " + user.displayName);
  }
  else {
    console.log("no one signed in");
    $('.menu .signInBtn').addClass('button');
    $('.menu .signInBtn').text("Register/LogIn");
    $('.menu .signInBtn').attr('data-open', 'registerModal');
    $('.menu .signOutBtn').addClass('hide');
  }
});

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
<<<<<<< HEAD

=======
>>>>>>> master
