/* GET NECESSARY ELEMENTS */
const myForm = document.getElementById("myForm");
const nameElement = document.getElementById("name");
const nameLabel = document.getElementById("nameLabel");
const surname = document.getElementById("surname");
const surnameLabel = document.getElementById("surnameLabel");
const email = document.getElementById("email");
const emailLabel = document.getElementById("emailLabel");
const message = document.getElementById("message");
const messageLabel = document.getElementById("messageLabel");
const submitBtn = document.getElementById("submitBtn");
const module = document.getElementById("module");
const moduleMessage = document.getElementById("moduleMessage");

/* EVENT LISTENERS */

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  /* VALIDATION */

  if (nameElement.value === "") {
    nameLabel.classList.add("error");
    nameElement.focus();
  }
  if (surname.value === "") {
    surnameLabel.classList.add("error");
    surname.focus();
  }
  if (email.value === "") {
    emailLabel.classList.add("error");
    email.focus();
  }
  if (message.value === "") {
    messageLabel.classList.add("error");
    message.focus();
  }

  /* FORM ACCEPTED AND SEND FROM TO THE API */

  if (
    nameElement.value !== "" &&
    surname.value !== "" &&
    email.value !== "" &&
    message.value !== ""
  ) {
    const data = {
      name: nameElement.value,
      surname: surname.value,
      email: email.value,
      message: message.value,
      date: new Date(),
    };

    submitBtn.classList.add("sendingFormBtn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Sending...";

    fetch("http://localhost:3004/add-form", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        /* SAVE FORM SUCCES */
        if (data.status === 200) {
          setTimeout(() => {
            submitBtn.classList.remove("sendingFormBtn");
            submitBtn.disabled = false;
            submitBtn.innerText = "Send";
            module.style.display = "flex";
            moduleMessage.innerText = data.message;
            setTimeout(() => {
              module.style.display = "none";
              nameElement.value = "";
              surname.value = "";
              email.value = "";
              message.value = "";
            }, 3000);
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

nameElement.addEventListener("keypress", (event) => {
  if (event.target.value.length > 0) {
    nameLabel.classList.remove("error");
  } else {
    nameLabel.classList.add("error");
  }
});
surname.addEventListener("keypress", (event) => {
  if (event.target.value.length > 0) {
    surnameLabel.classList.remove("error");
  } else {
    surnameLabel.classList.add("error");
  }
});
email.addEventListener("keypress", (event) => {
  if (event.target.value.length > 10) {
    emailLabel.classList.remove("error");
  } else {
    emailLabel.classList.add("error");
  }
});
message.addEventListener("keypress", (event) => {
  if (event.target.value.length > 5) {
    messageLabel.classList.remove("error");
  } else {
    messageLabel.classList.add("error");
  }
});
