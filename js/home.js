const value = sessionStorage.getItem("userInput");

if (!value || value.trim().length <= 3) {
    window.location.replace("index.html");
}

window.addEventListener("load", () => {
    const qr = new Html5Qrcode("reader");
    let scanned = false;


    qr.start(
        { facingMode: "environment" },
        {
            fps: 10,
            aspectRatio: 9 / 16,
            qrbox: { width: 300, height: 300 }
        },
        (decodedText) => {

            if (scanned) return;
            scanned = true;
            console.log(decodedText)
            qr.stop();

            // Redirect with QR value
            window.location.href = "info.html?qr=" + encodeURIComponent(decodedText);
        }
    ).catch(error => {
        console.error("Catch error: ", error)
        alert("Unexpected Error Occured: ", error)
    });
});