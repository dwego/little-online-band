function verifyCode(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = `/${enterCode}`;
      } else {
        const response = document.getElementById("response");
        response.textContent = "Invalid email or password";
      }
    })
    .catch((error) => alert(error.message));
}
