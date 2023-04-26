function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

const code = generateCode();
const url = "http://localhost:8080/api/code";

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ code: code }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error sending code.");
    }
    console.log("Code sent successfully.");
  })
  .catch((error) => console.error(error));
