const pianoKeys = document.querySelectorAll(".piano-keys .key"),
  volumeSlider = document.querySelector(".volume-slider input"),
  keysCheckbox = document.querySelector(".keys-checkbox input");

let possibleKeys = [],
  audio = new Audio("tunes/a.wav");

// Plays (and presses) the audio from the pressed/clicked key
const pressPlayKey = (key) => {
  audio.src = `tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key=${key}]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

// Setting an array of possible keys and event listeners to each key
pianoKeys.forEach((key) => {
  possibleKeys.push(key.dataset.key);
  key.addEventListener("click", () => pressPlayKey(key.dataset.key));
});

// Toggles the hide class on all key html elements
const showHideKeys = (e) => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

// Sets the volume equal to the volume slider value
const handleVolume = (e) => {
  audio.volume = e.target.value;
};

// Playing piano through keyboard keys, allowing only the possible keys
const pressedKey = (e) => {
  if (possibleKeys.includes(e.key)) pressPlayKey(e.key);
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
