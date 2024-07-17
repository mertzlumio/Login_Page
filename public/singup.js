function p_signup() {
    event.preventDefault();
  const n_username = document.getElementById("nusername").value;
  const n_password = document.getElementById("npassword").value;
  const error_msg = document.getElementById(error_msg);

  if(n_username!=''&&n_password!='')
  {
    const xhr1= new XMLHttpRequest();
    xhr1.open("POST", "/signup", true);
    xhr1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr1.onload = function () {
        if (xhr1.status === 200) {
          console.log("Response from server:", xhr1.responseText);
          window.location.href = "index.html";
        } else {
          error_msg.hidden = !error_msg.hidden;
        }
      };

      xhr1.send(JSON.stringify({ username: n_username, password: n_password }));
  }
}

function login1(){
    window.location.href = "index.html";
}
