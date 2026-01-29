window.addEventListener("load", () => {
    const value = sessionStorage.getItem("userName");

    if (!value || value.trim().length <= 3) {
        window.location.replace("/");
    }
    // Get QR value from URL
    const params = new URLSearchParams(window.location.search);
    const qrValue = params.get("qr");

    if (!qrValue) {
        document.getElementById("info").innerHTML = "No QR data found.";
        throw new Error("No QR parameter");
    }

    fetch("../data/data.json")
        .then(async (res) => {
            const dataJSON = await res.json();
            console.log("dataJSON", dataJSON);
            console.log("qrValue", qrValue)
            const result = dataJSON.find(item => item.id === qrValue);

            if (!result) {
                document.getElementById("info").innerHTML = "QR not found.";
                return;
            }

            document.getElementById("info").innerHTML = `
                <img src="${result.image_url}"/>
                <center><h2>${result.name} ${result.scientificName ? '(<i>' + result.scientificName + '</i>)' : ""}</h2></center>
              <p><strong>Local Name (In Philippines):</strong></p>
                <ul>
                ${result.localName.map(item => `<li>${item}</li>`).join("")}
                </ul>
                <p><strong>Benefits:</strong></p>                
                 <ul>
                ${result.benefits.map(item => `<li>${item}</li>`).join("")}
                </ul>
                <p><strong>Medical Use:</strong></p>             
                 <ul>
                ${result.medicalUse.map(item => `<li>${item}</li>`).join("")}
                </ul>
                <p><strong>Ornamental Use:</strong></p>             
                <ul>
                ${result.ornamentalUse.map(item => `<li>${item}</li>`).join("")}
                </ul>
                <p><strong>Propagation:</strong></p>
                  <ul>
                ${result.propagation.map(item => `<li>${item}</li>`).join("")}
                </ul>


            `
        })

        .catch(err => {
            document.getElementById("info").innerHTML = "Error loading data.";
            console.error(err);
        });
});