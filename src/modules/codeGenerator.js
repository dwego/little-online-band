function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

let codeGenerator = true;

function generateRoom() {
  let password = "1234";
  let code = generateCode();

  if (password == "") {
    password = null;
  }
  if (codeGenerator) {
    fetch("http://localhost:8080/api/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log({ code: code, password: password });
          throw new Error("Error sending code.");
        }
        console.log("Code sent successfully.");
        codeGenerator = false;
      })
      .catch((error) => console.error(error));

    const link = document.createElement("a");
    link.href = `http://localhost:8080/rooms/${code}`;
    link.textContent = `localhost:8080/rooms/${code}`;

    const container = document.getElementById("container");
    container.appendChild(link);
  } else {
    const codeResponse = document.getElementById("codeResponse");
    codeResponse.textContent = "Room already created";
  }
}
