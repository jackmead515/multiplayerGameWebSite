function login() {
  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;

  $.post('http://192.168.1.25:3000/login', {
    email: email,
    password: password
  }, function(data, status) {
    if(status === 'success'){
      if(data.status === 200){
        window.location.href = 'http://192.168.1.25:3000/home';
      } else {
        document.getElementById('errorMessage').innerHTML = data.message;
      }
    } else {

    }
  });
}

function createAccount() {

  var email = document.getElementById("emailInput").value;
  var password = document.getElementById("passwordInput").value;
  var username = document.getElementById("usernameInput").value;

  $.post('http://192.168.1.25:3000/create', {
    email: email,
    password: password,
    username: username
  }, function(data, status) {
    if(status === 'success'){
      if(data.status === 200){
        window.location.href = 'http://192.168.1.25:3000/home';
      } else {
        document.getElementById('errorMessage').innerHTML = data.message;
      }
    } else {

    }
  });

}
