function checkInputLenght() {
    const input = document.getElementById("textInput").value;
    const button = document.getElementById("submitBtn");

    button.disabled = input.length <= 3;
}
function submitAndProceed() {
    const inputValue = document.getElementById("textInput").value.trim();

    // Save to sessionStorage
    sessionStorage.setItem("userInput", inputValue);

    // Redirect to next page
    window.location.href = "home.html";
}