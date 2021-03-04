const html = document.querySelector("html");
const checkbox = document.querySelector("#theme-switch input");

const getStyle = (element, style) =>
    window
    .getComputedStyle(element)
    .getPropertyValue(style);

const light = {
    background: getStyle(html, "--background"),
    backgroundCard: getStyle(html, "--background-card"),
    backgroundTableTr: getStyle(html, "--background-table-tr"),
    backgroundModal: getStyle(html, "--background-modal"),
    backgroundForm: getStyle(html, "--background-form"),
    tableFont: getStyle(html, "--table-font"),
    colorHeadings: getStyle(html, "--color-headings"),
    formInputFont: getStyle(html, "--form-input-font"),
    inputDateFont: getStyle(html, "--input-date-font")
    
}

const dark = {
    background: "#333333",
    backgroundCard: "#333333",
    backgroundTableTr: "#242424",
    backgroundModal: "#333333",
    backgroundForm: "#242424",
    tableFont: "darkgrey",
    colorHeadings: "white",
    formInputFont: "white",
    inputDatefont: "white"
}



const transformKey = key => 
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();


const changeColors = colors =>
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
        
    })


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(dark) : changeColors(light);
})

