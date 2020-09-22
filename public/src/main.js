function hover(element) {
    const filename = element.getAttribute('file');
    element.setAttribute("src", `https://cdn.streaming-ondemand.xyz/${filename}-preview.gif`);
}

function unhover(element) {
    const filename = element.getAttribute('file');
    element.setAttribute("src", `https://cdn.streaming-ondemand.xyz/${filename}-thumb.jpg`);
}
