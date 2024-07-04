const inputEle = document.querySelector(".noinput");
const genbtnEle = document.querySelector(".btn-generate");
const copybtnEle = document.querySelector(".btn-copy");
const inputoptEle = document.querySelector("#opt-input");
const gencontentEle = document.querySelector(".gen-content");

genbtnEle.addEventListener("click", () => {
  if (validateInput()) {
    getValues();
  }
});

function getValues() {
  const count = inputEle.value;
  const options = inputoptEle.value === "paragraph" ? "paras" : "sentences";
  console.log(count, options);

  let url = `https://baconipsum.com/api/?type=meat-and-filler&${options}=${count}&start-with-lorem=1`;

  fetchContent(url);
}

async function fetchContent(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    let data = await response.json();
    displayGenContent(data);
  } else {
    alert("Internal Server Error");
  }
}

function displayGenContent(data) {
  let texts = data.join("<br><br>");
  gencontentEle.innerHTML = texts;
}

function validateInput() {
  let count = inputEle.value;
  if (count > 100) {
    invalidInput();
    inputEle.value = "100";
    return false;
  } else if (count < 1 || isNaN(count)) {
    invalidInput();
    inputEle.value = "1";
    return false;
  }
  return true;
}

function invalidInput() {
  // inputEle.style.borderColor = "#ff6a67";
  // setTimeout(() => {
  //   inputEle.style.borderColor = "#d3deb4";
  // }, 3000);

  alert("Min input  is 1 , Max input is 100");
}

copybtnEle.addEventListener("click", () => {
  let copytext = gencontentEle.textContent;
  navigator.clipboard.writeText(copytext);
});
