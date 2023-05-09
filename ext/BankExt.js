document.body.style.border = "50px solid blue";

function modifyText() {
    console.log("hello");
    const accnr_elem = document.getElementById("accnr_id");
    console.log(accnr_elem.value);
    accnr_elem.value = 2137;
    console.log(accnr_elem.value);
    // window.location.href = "http://localhost:3000/"
}

modifyText();
const button = document.getElementById("confirm_id");
