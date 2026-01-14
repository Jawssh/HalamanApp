let dialogueCount = 0;

window.addEventListener("load", () => {
    const dialogueContent = document.getElementById("dialogue-content");
    const nextButton = document.getElementById("next-button");
    const charImage = document.getElementById("char-image")
    const mouthEl = document.getElementById("mouth")
    const welcomeEl = document.getElementById("welcome-container")
    const nextPageEl = document.getElementById("next-page")
    dialogueContent.textContent = DIALOGUE[dialogueCount].message;

    const textInput = document.getElementById("textInput")
    const submitBtn = document.getElementById("submitBtn");

    const value = sessionStorage.getItem("userName");

    if (value && value?.trim().length > 3) {

        showNextPage();
    };
    textInput.addEventListener("input", checkInputLenght)

    function checkInputLenght() {
        submitBtn.disabled = textInput.value.length < 3;
    }

    submitBtn.addEventListener("click", submitAndProceed)
    function submitAndProceed() {

        // Save to sessionStorage
        sessionStorage.setItem("userName", textInput.value.trim());
        showNextPage();

    }

    nextButton.addEventListener("click", nextDialogue)
    function nextDialogue() {
        if (dialogueCount + 1 < DIALOGUE.length) {
            dialogueCount++
            if (DIALOGUE[dialogueCount].hasName) {
                dialogueContent.textContent = DIALOGUE[dialogueCount].message + sessionStorage.getItem("userName");
            } else {
                dialogueContent.textContent = DIALOGUE[dialogueCount].message;
            }

            if (DIALOGUE[dialogueCount].speak) {
                charImage.src = "./assets/images/carla2.png"
                charImage.style.marginRight = "130px"
                mouthEl.style.visibility = "visible"
            }

        } else {
            window.location.href = "/html/home.html";
        }
    }

    function showNextPage() {
        welcomeEl.style.display = "none"
        nextPageEl.style.display = "contents"
    }
});