const _username = "Farhad";
const _password = "onecvlandingapi";

const notLogin = document.getElementById("notLogin");
const isLogin = document.getElementById("isLogin");
const loginForm = document.getElementById("loginForm");
const username = document.getElementById("username");
const usernameLabel = document.getElementById("usernameLabel");
const password = document.getElementById("password");
const paswordLabel = document.getElementById("paswordLabel");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (username.value === "") {
    usernameLabel.classList.add("error");
    nameElement.focus();
  }
  if (password.value === "") {
    paswordLabel.classList.add("error");
    surname.focus();
  }

  fetch("http://localhost:3004/get-forms", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username.value,
      pass: password.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      notLogin.style.display = "none";
      isLogin.style.display = "flex";
      for (let i = 0; i < data.forms.length; i++) {
        const card = document.createElement("div");
        card.classList.add("cardWrapper");
        card.innerHTML = `
              <div class="cardRowWrapper">
                  <span class="cardTitle">Name :</span>
                  <span>${data.forms[i].name}</span>
              </div>
              <div class="cardRowWrapper">
                  <span class="cardTitle">Surname :</span>
                  <span>${data.forms[i].surname}</span>
              </div>
              <div class="cardRowWrapper">
                  <span class="cardTitle">Email</span>
                  <span>${data.forms[i].email}</span>
              </div>
              <div class="cardRowWrapper">
                  <span class="cardTitle">Message</span>
                  <span>${data.forms[i].message}</span>
              </div>
          `;
      }
    });
});
username.addEventListener("keypress", (event) => {
  if (event.target.value.length > 0) {
    usernameLabel.classList.remove("error");
  } else {
    usernameLabel.classList.add("error");
  }
});
password.addEventListener("keypress", (event) => {
  if (event.target.value.length > 0) {
    paswordLabel.classList.remove("error");
  } else {
    paswordLabel.classList.add("error");
  }
});
