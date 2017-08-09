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