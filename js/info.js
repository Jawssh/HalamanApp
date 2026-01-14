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
                <h2>${result.name} ${result.scientificName ? '(<i>' + result.scientificName + '</i>)' : ""}</h2>
                <p><strong>Definition:</strong> ${result.definition}</p>
                <p><strong>Origin:</strong> ${result.origin}</p>
                <p><strong>Science Classification:</strong> ${result.scientificClass}</p>
                <p><strong>Type/Species:</strong> ${result.type}</p>
                <p><strong>Synonyms:</strong> ${result.synonyms}</p>
                <p><strong>Benefits:</strong> ${result.benefits}</p>
                <p><strong>Life Span:</strong> ${result.lifeSpan}</p>


            `
        })

        .catch(err => {
            document.getElementById("info").innerHTML = "Error loading data.";
            console.error(err);
        });
});