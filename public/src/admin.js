function getStyle(element, name) {
    return element.currentStyle
        ? element.currentStyle[name]
        : window.getComputedStyle
        ? window.getComputedStyle(element, null).getPropertyValue(name)
        : null;
}

function toggleForm(formName, categoryName = null) {
    const form = document.getElementsByClassName(formName)[0];
    const body = document.getElementsByTagName("body")[0];
    const display = window
        .getComputedStyle(form, null)
        .getPropertyValue("display");
    if (form && display === "none") {
        form.style.display = "block";
        body.classList.add("no-scroll");

        if (formName == "add-movie") {
            categoryInput = document.getElementById("categoryInput");
            categoryInput.value = categoryName;
        }
    } else {
        form.style.display = "none";
        body.classList.remove("no-scroll");
    }
}

function disablePropagation() {
    event.stopPropagation();
}

function uploadMovie() {
    toggleForm("add-movie");
    const titleInput = document.getElementById("titleInput");
    const categotyInput = document.getElementById("categoryInput");
    const thumbnailInput = document.getElementById("thumbnailInput");
    const movieInput = document.getElementById("movieInput");
    const movie = {
        title: titleInput.value,
        category: categotyInput.value,
        thumbnail: thumbnailInput.files[0].name,
        fileName: movieInput.files[0].name,
    };

    fetch("https://dash-streaming.xyz/add-movie", {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
            "content-type": "application/json",
        },
    })
        .then((response) => response.json())
        .catch((error) => console.error("Error:", error))
        .then((response) => {
            console.log("upload to dashy>");
            uploadDashy(response.token, movieInput);
        });
}

function uploadDashy(token, movieInput) {
    var formData = new FormData();
    formData.append("movie", movieInput.files[0]);
    formData.append("thumbnail", thumbnailInput.files[0]);
    formData.append("token", token);

    fetch("https://localhost:3000/upload-movie", {
        method: "POST",
        body: formData,
        
    }).catch((error) => console.error("Error:", error));
}
