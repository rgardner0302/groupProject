var currentUser;

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

//GOOGLE SIGN IN

//get user information
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
  };

//google sign out
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    });
  }

//add event reminder to calendar
$('.remind').on('click', function() {
  var clientId = '478137109323-67523o1tnhd0ol9bndqpvf4ojm1kk1i1.apps.googleusercontent.com';
  //use browser api key
  var apiKey = 'AIzaSyDBAdHjSdgGLClbiEGBdS2Xcp6Yx27WJPk';
  var scope = 'https://www.googleapis.com/auth/calendar';

  //insert calendar event
		var event = {
      date: $(".date-input").val().trim(),
  		remember:$(".remember-input").val().trim()
  	}
		console.log(event.date);
		console.log(event.remember);
		console.log(gapi.client);
	  var request = gapi.client.calendar.events.insert({
	  'calendarId': 'primary',
	  'resource': event
	  });

	request.execute(function(event) {
	  appendPre('Event created: ' + event.htmlLink);
	});
	  	
});
   