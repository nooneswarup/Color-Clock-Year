timeEle = document.querySelector("#time");
dateEle = document.querySelector("#day");
hexEle = document.querySelector("#hex");

let allColors = 256 * 256 * 256;
let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function yearClock() {
  let date = new Date();

  let year = date.getFullYear();
  if (year != year) {
    hexColor = "#ffffff";
  }
  //   console.log(year);
  let epocSecsThisYear = Math.floor(
    new Date("Jan 01, " + year + " 00:00:00").getTime() / 1000
  );
  //   console.log(epocSecsThisYear);
  //   console.log(typeof epocSecsThisYear);

  let epocSecsToday = Math.floor(date.getTime() / 1000);
  //   console.log(epocSecsToday);
  //   console.log(typeof epocSecsToday);
  let timeNowInSecs = epocSecsToday - epocSecsThisYear;
  // console.log("timeNowInSecs :" + timeNowInSecs);

  yearFrame = Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: timezone,
  }).format(date);
  // console.log(yearFrame);

  let frame = yearFrame.replace(/\s/g, "");
  frame = frame.split(/[\/,:]/).map((x) => +x);
  // console.log(frame);

  colorSecs = Math.floor(timeNowInSecs / 1.89);

  // console.log("hexcolor in decimal: " + colorSecs);
  hexColor = "#" + colorSecs.toString(16);
  // console.log(hexColor);
  setContrast(hexColor);

  hexEle.innerHTML = hexColor;
  document.body.style.backgroundColor = hexColor;
}

function setContrast(hex) {
  // console.log(hex);
  let hexToRgb = hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

  // console.log(hexToRgb);

  const brightness = Math.round(
    (parseInt(hexToRgb[0] * 299) +
      parseInt(hexToRgb[1] * 587) +
      parseInt(hexToRgb[2]) * 114) /
      1000
  );
  // console.log(brightness);
  const textColour = brightness > 125 ? "black" : "white";
  //   console.log(textColour);
  timeEle.style.color = textColour;
  dateEle.style.color = textColour;
  hexEle.style.color = textColour;
}

function dateHeading() {
  let datenow = new Date();
  datenow = Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(datenow);
  dateEle.innerHTML = datenow.replaceAll(",", " ");

  let timenow = new Date();
  timenow = Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timenow);
  timeEle.innerHTML = timenow.replaceAll(",", " ");
}
var bagcolor = setInterval(yearClock, 1000 * 1.88);

var date = setInterval(dateHeading, 1000);
