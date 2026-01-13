let dialogueCount = 0;

window.addEventListener("load", () => {
    const dialogueContent = document.getElementById("dialogue-content");
    const nextButton = document.getElementById("next-button");
    const charImage = document.getElementById("char-image")
    const mouthEl = document.getElementById("mouth")
    dialogueContent.textContent = DIALOGUE[dialogueCount].message;
    function checkInputLenght() {
        const input = document.getElementById("textInput").value;
        const button = document.getElementById("submitBtn");

        button.disabled = input.length <= 3;
    }
    function submitAndProceed() {
        const inputValue = document.getElementById("textInput").value.trim();

        // Save to sessionStorage
        sessionStorage.setItem("userName", inputValue);


    }

    nextButton.addEventListener("click", nextDialogue)
    function nextDialogue() {
        if (dialogueCount + 1 < DIALOGUE.length) {
            dialogueCount++
            dialogueContent.textContent = DIALOGUE[dialogueCount].message;
            if (DIALOGUE[dialogueCount].speak) {
                charImage.src = "./assets/images/carla2.png"
                charImage.style.marginRight = "130px"
                mouthEl.style.visibility = "visible"
            }

        } else {
            window.location.href = "html/home.html";
        }



    }




});