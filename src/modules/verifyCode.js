function verifyCode(event) {
  console.log("Button clicked");
  event.preventDefault();

  const enterCode = document.getElementById("codeVerify").value;

  fetch(`/api/rooms/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enterCode: enterCode,
    }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = `/rooms/${enterCode}`;
      } else {
        const codeResponse = document.getElementById("codeResponse");
        codeResponse.textContent = "Invalid code.";
      }
    })
    .catch((error) => alert(error.message));
}
