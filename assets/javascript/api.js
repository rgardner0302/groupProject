var currentUser;
var userName;
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

//gets info from register and enter to firebase
$("#registerModal.reveal").on("click", "#submitUser", function(event) {
  console.log('test');
  var firstName = $("#firstname").val().trim();
  var lastName = $("#lastname").val().trim();
  var email = $("#email").val().trim();
  var password1 = $("#password1").val().trim();
  var password2 = $("#password2").val().trim();

  var newUserRef = userData.push();
  newUserRef.set({
    postId: newUserRef.key,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password1
  });
  currentUser = firstName;
  $('.close-reveal-modal').click();
});

if (currentUser != null) {
  $("#signout").html('<li><button class="button" data-open="registerModal">Sign Out</button></li>');
}

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
   