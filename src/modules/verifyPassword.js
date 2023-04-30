const path = window.location.pathname;
const codePass = path.split("/").pop();

function submitForm() {
  const passwordPass = document.getElementById("passwordPass").value;

  fetch(`/${codePass}/password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      passwordPass: passwordPass,
    }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = `/${codePass}`;
        return;
      } else {
      }
    })
    .catch((error) => alert(error.message));
}
