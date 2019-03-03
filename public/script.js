let regButton = document.getElementById('regButton');
regButton.onclick = function () {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/newUser", true);
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
  xhr.send(JSON.stringify({
    email: email.value,
    password: password.value,
    displayname: displayName.value
  }));
  
  email.value = '';
  password.value = '';
  displayName.value = '';

  return false;
};

