const form = document.getElementById("form");
const qr = document.getElementById("qrCode");

const onGenerateSubmit = (e) => {
  e.preventDefault();
  cleanUi();

  const url = document.getElementById("url").value;
  const size = document.getElementById("size").value;

  if (url === "") {
    alert("Please Enter a valid URL");
  } else {
    showSpinner();
    setTimeout(() => {
      hideSpinner();
      generateQrCode(url, size);
      setTimeout(() => {
        const saveUrl = qr.querySelector("img").src;
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }

  console.log(url, size);
};

// clean previous generate qrCode image
const cleanUi = function () {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("saveLink");

  if (saveBtn) {
    saveBtn.remove();
  }
};

//generate qr code
const generateQrCode = function (url, size) {
  const qrcode = new QRCode("qrCode", {
    text: url,
    width: size,
    height: size,
  });
};

// show spinner function
const showSpinner = function () {
  document.getElementById("spinner").style.display = "block";
};

// hide spinner function
const hideSpinner = function () {
  document.getElementById("spinner").style.display = "none";
};

//create save button
const createSaveBtn = function (saveUrl) {
  const link = document.createElement("a");
  link.id = "saveLink";
  link.classList = "downloadBtn";
  link.href = saveUrl;
  link.download = "qrCode";
  link.innerHTML = "Save Image";
  document.getElementById("generated").appendChild(link);
};

// function calling
hideSpinner();
form.addEventListener("submit", onGenerateSubmit);
