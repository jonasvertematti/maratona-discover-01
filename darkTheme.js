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
    inputDateFont: getStyle(html, "--input-date-font"),
    footerFont: getStyle(html, "--footer-font")
    
}

const dark = {
    background: "#333333",
    backgroundCard: "#242424",
    backgroundTableTr: "#242424",
    backgroundModal: "#333333",
    backgroundForm: "#242424",
    tableFont: "darkgrey",
    colorHeadings: "white",
    formInputFont: "white",
    inputDatefont: "white",
    footerFont: "white"
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/g, "-$1").toLowerCase();


const changeColors = colors =>
    Object.keys(colors).map(key => {
        html.style.setProperty(transformKey(key), colors[key])
        
    })

const StorageDarkTheme = {
    get() {
        return localStorage.getItem("darkTheme") || false;
    },
    set(darkThemeState) {
        localStorage.setItem("darkTheme", darkThemeState);
    }
}


checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(dark) : changeColors(light);
})

