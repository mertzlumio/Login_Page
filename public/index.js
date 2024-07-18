let username;
let password;
let errorMsg;
function login() {
  event.preventDefault();
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  errorMsg = document.getElementById("error");
  //console.log(username);

  if (username != "" && password != "") {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Response from server:", xhr.responseText);
        window.location.href = "dashboard.html";
      } else {
        //document.getElementById('error').value='Invalid Creditionals';
        errorMsg.hidden = !errorMsg.hidden;
      }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));

    if (document.getElementById("checkbox1").checked) {
      var d = new Date();
      d.setTime(d.getTime() + 86400 * 1000);
      document.cookie =
        username + "=" + password + ";expires=" + d.toGMTString() + ";path=/";
    }
  } else {
    alert("Input fields cannot be empty");
  }
  console.log(document.cookie);
}

function signup() {
  window.location.href = "signup.html";
}

document.getElementById("username").addEventListener("input", function () {
  let enteredUsername = this.value;

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${encodeURIComponent(enteredUsername)}=`))
    ?.split("=")[1];

  if (cookieValue) {
    document.getElementById("password").value = decodeURIComponent(cookieValue);
  } else {
    document.getElementById("password").value = "";
  }
});
