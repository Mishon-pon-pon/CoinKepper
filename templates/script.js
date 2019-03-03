let sub = document.getElementById('sub');
  sub.onclick  = function () {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/reg", true);

    xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    xhr.send(JSON.stringify({
      email: exampleInputEmail1.value,
      pass: exampleInputPassword1.value,
      displayname: DisplayName.value
    }));

    this.elements.message.value = '';

    return false;
  };

 