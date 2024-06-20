const ip = "192.168.1.104";
const port = 5000;
let isLoading = false;

function onLungCancerDetection() {
  let buttonName = document.getElementById("form-button-name");
  let loader = document.getElementById("loader");
  buttonName.classList.add("active-form-button");
  loader.classList.add("active-loader");
  let name = document.getElementById("name-lung").value;
  let email = document.getElementById("email-lung").value;
  let fileInput = document.getElementById("file-lung");
  file = fileInput.files[0];

  isValid = formValidation(name, email, file);

  if (true && !isLoading) {
    isLoading = true;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", file);
    data = { file: file };

    fetch(`http://${ip}:${port}/detectLungCancer/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((data) => {
        loader.classList.remove("active-loader");
        buttonName.classList.remove("active-form-button");
        showMessage(data.response);
        console.log(data);
        isLoading = false;
      })
      .catch((error) => {
        loader.classList.remove("active-loader");
        buttonName.classList.remove("active-form-button");
        document.getElementById("h1test").innerHTML = error;
        console.error("Error:", error);
        isLoading = false;
      });
  }

  // console.log("here");
}

//validation
function formValidation(name, email, file) {
  if (name.trim() === "") {
    alert("Please enter your name.");
    return false;
  }
  if (email.trim() === "") {
    alert("Please enter your email.");
    return false;
  } else if (!isValidEmail(email)) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!file) {
    alert("Please select a file.");
    return false;
  }
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function onPositivePopupClose() {
  let positive = document.getElementById("positive-popup");
  positive.classList.remove("positive-answer-open");
}
function onSkinCancerDetection() {
  let positive = document.getElementById("negative-popup");
  positive.classList.add("negative-answer-open");
  console.log("here");
}
function onNegativePopupClose() {
  let positive = document.getElementById("negative-popup");
  positive.classList.remove("negative-answer-open");
}

function showMessage(value) {
  console.log(value);
  console.log("here");
  if (value) {
    let positive = document.getElementById("positive-popup");
    positive.classList.add("positive-answer-open");
  } else {
    let positive = document.getElementById("negative-popup");
    positive.classList.add("negative-answer-open");
  }
}
