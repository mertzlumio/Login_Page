function p_signup() {
  event.preventDefault();

  let n_username = document.getElementById("nusername").value;
  let n_password = document.getElementById("npassword").value;
  let error_msg = document.getElementById("error_msg");
  console.log(n_username);
  if (n_password != "" && n_username != "") {
    const xhr1 = new XMLHttpRequest();
    xhr1.open("POST", "/signup", true);
    xhr1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr1.onload = function () {
      if (xhr1.status === 201) {
        console.log("Response from server:", xhr1.responseText);
        alert("Account created Successfully! Redirecting to login page.");
        window.location.href = "index.html";
      }
      if (xhr1.status === 400) {
        console.log("Response from server:", xhr1.responseText);
        error_msg.hidden = !error_msg.hidden;
      }
    };

    xhr1.send(
      JSON.stringify({ n_username: n_username, n_password: n_password })
    );
  } else {
    alert("Input values cannot be empty");
  }
}

function login1() {
  window.location.href = "index.html";
}
