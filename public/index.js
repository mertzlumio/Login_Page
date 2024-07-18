let username;
let password;
let errorMsg;
let flag=false;
let cookieValue=document.cookie;
if(cookieValue){
  username=document.cookie.split("=")[0];
  console.log(username);
  password=document.cookie.split("=")[1];
  console.log(password);
  flag=true;
  login();
}

function login() {
  //event.preventDefault();
  if(!flag){
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  errorMsg = document.getElementById("error");
  //console.log(username);
  }

  if ((username != "" && password != "")||flag) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/login", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("Response from server:", xhr.responseText);
        if (document.getElementById("checkbox1").checked) {
          var d = new Date();
          d.setTime(d.getTime() + 86400 * 1000);
          document.cookie =
            username + "=" + password + ";expires=" + d.toGMTString() + ";path=/";
        }
        window.location.href = "dashboard.html";
      } else {
        errorMsg.hidden = false;
        //console.log(errorMsg.hidden);
      }
    };
    xhr.send(JSON.stringify({ username: username, password: password }));

   
  } else {
    alert("Input fields cannot be empty");
  }
  //console.log(document.cookie);
}

function signup() {
  window.location.href = "signup.html";
}

// document.getElementById("username").addEventListener("input", function () {
//   let enteredUsername = this.value;

//   const cookieValue = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith(`${encodeURIComponent(enteredUsername)}=`))
//     ?.split("=")[1];

//   if (cookieValue) {
//     document.getElementById("password").value = decodeURIComponent(cookieValue);
//   } else {
//     document.getElementById("password").value = "";
//   }
// });

function logout() {
  cookieValue=document.cookie;
  console.log(document.cookie);

  if(cookieValue){
  username=document.cookie.split("=")[0];
  password=document.cookie.split("=")[1];
  console.log(username);

  document.cookie =username + "=" + password + "; max-age=-4;path=/;";
  }

window.location.href = "index.html";
}