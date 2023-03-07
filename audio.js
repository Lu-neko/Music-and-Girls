const audioContext = new window.AudioContext();

const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);


const sounds = authors.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
const artists = authors.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);


const music_area = document.getElementById("musics");
const artist_area = document.getElementById("artists");

const select = document.createElement("select");

let disabled = document.createElement("option");
disabled.hidden = true;
disabled.textContent = "Select";
select.appendChild(disabled);

for (let artist of artists) {
  let option = document.createElement("option");
  option.textContent = artist[1];
  select.appendChild(option);

  let description = document.createElement("p");
  description.textContent = artist[2];
  artist_area.appendChild(description);
}

for (let sound of sounds) {
  let content = document.createElement("div");
  let audio = document.createElement("audio");
  audio.src = "musics/"+sound[0];
  audio.controls = true;
  content.appendChild(audio);
  content.appendChild(select.cloneNode(deep = true))
  music_area.appendChild(content);

  audio.addEventListener("pause", () => {
    if (basicSdkInstance.checkToyOnline()) {
      basicSdkInstance.sendToyCommand({ vibrate: 0 });
    }
  })

  audio.addEventListener("timeupdate", () => {
    analyser.getByteTimeDomainData(dataArray);
    //console.log(Math.max(...dataArray) - 128)
    if (basicSdkInstance.checkToyOnline()) {
      basicSdkInstance.sendToyCommand({
        vibrate: Math.max(...dataArray) - 128
      });
    }

  });

  let track = audioContext.createMediaElementSource(audio);
  track.connect(analyser).connect(audioContext.destination);
}

let validate_div = document.createElement("div");
let validate = document.createElement("button");
validate.textContent = "Validate";
validate_div.appendChild(validate);
music_area.appendChild(validate_div);

const elements = music_area.getElementsByTagName("select");

validate.addEventListener("click", () => {
  let score = 0;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].value == sounds[i][1]) {
      score += 1;
    }
  }
  alert(score + "/" + elements.length);
})