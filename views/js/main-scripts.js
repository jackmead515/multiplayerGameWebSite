$(document).ready(function() {

  $('#main-heading').fadeIn(1000);
  $('#greeting').slideDown(1000);
  $('errorMessage').slideDown(500);
});

var helpEmailFormOpened = false;
function openHelpEmailForm() {
  if(helpEmailFormOpened === false) {
    helpEmailFormOpened = true;
    $('#emailForm').slideDown(1000);
  } else {
    helpEmailFormOpened = false;
    $('#emailForm').slideUp(1000);
  }
}
