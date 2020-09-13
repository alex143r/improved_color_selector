"use strict";
let selectedColor = "#ff0000";
document.querySelector("#input").addEventListener("input", getInput);
window.addEventListener("DOMContentLoaded", start);
let harmony = "analogous";
let hsl;

function start() {
    document.querySelectorAll(".content3 input").forEach((button) => {
        button.addEventListener("click", colorChoice);
    })
    console.log(harmony);
}

function colorChoice() {
    if (this.value == "analogous") {
        harmony = "analogous";
    }
    if (this.value == "monochromatic") {
        harmony = "monochromatic";
    }
    if (this.value == "triad") {
        harmony = "triad";
    }
    if (this.value == "complementary") {
        harmony = "complementary";
    }
    if (this.value == "compound") {
        harmony = "compound";
    }
    if (this.value == "shades") {
        harmony = "shades";
    }
    console.log("ya yeet" + harmony);
    delegator(selectedColor);
}

function getInput() {
    document.querySelector("#input").addEventListener("input", getInput);

    selectedColor = document.querySelector("#input").value;
    delegator(selectedColor);
}

function delegator(selectedColor) {
    console.log("delegator");

    let rgb = hexToRGB(selectedColor);
    hsl = rgbToHSL(rgb);
    let colors = calcHarmony();
    hslToRGB(colors);
    rgbToHex(colors);

    displayRGB(colors);
    displayHex(colors);
    displayHSL(colors);
    displayBox(colors);
}

function test() {
    console.log("yo" + this.value);
}

function displayBox(colors) {
    document.querySelector(".color_container:nth-child(1) .box").style.backgroundColor = `hsl(${colors[0].h}, ${colors[0].s}%, ${colors[0].l}%)`;
    document.querySelector(".color_container:nth-child(2) .box").style.backgroundColor = `hsl(${colors[1].h}, ${colors[1].s}%, ${colors[1].l}%)`;
    document.querySelector(".color_container:nth-child(3) .box").style.backgroundColor = `hsl(${colors[2].h}, ${colors[2].s}%, ${colors[2].l}%)`;
    document.querySelector(".color_container:nth-child(4) .box").style.backgroundColor = `hsl(${colors[3].h}, ${colors[3].s}%, ${colors[3].l}%)`;
    document.querySelector(".color_container:nth-child(5) .box").style.backgroundColor = `hsl(${colors[4].h}, ${colors[4].s}%, ${colors[4].l}%)`;
}

function hslToRGB(colors) {
    colors.forEach(colors => {
        let h = colors.h;
        let s = colors.s / 100;
        let l = colors.l / 100;

        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;
        if (0 <= h && h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (60 <= h && h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (120 <= h && h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (180 <= h && h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (240 <= h && h < 300) {
            r = x;
            g = 0;
            b = c;
        } else if (300 <= h && h < 360) {
            r = c;
            g = 0;
            b = x;
        }
        colors.r = Math.round((r + m) * 255);
        colors.g = Math.round((g + m) * 255);
        colors.b = Math.round((b + m) * 255);
    })
    return colors;
}

function rgbToCSS(rgb) {
    let css = `rgb(${rgb.r},${rgb.g}, ${rgb.b})`;
    return css;
}

function displayRGB(colors) {
    document.querySelector(".color_container:nth-child(1) p:nth-child(3)").innerHTML = `RGB: ${colors[0].r}, ${colors[0].g}, ${colors[0].b}`;
    document.querySelector(".color_container:nth-child(2) p:nth-child(3)").innerHTML = `RGB: ${colors[1].r}, ${colors[1].g}, ${colors[1].b}`;
    document.querySelector(".color_container:nth-child(3) p:nth-child(3)").innerHTML = `RGB: ${colors[2].r}, ${colors[2].g}, ${colors[2].b}`;
    document.querySelector(".color_container:nth-child(4) p:nth-child(3)").innerHTML = `RGB: ${colors[3].r}, ${colors[3].g}, ${colors[3].b}`;
    document.querySelector(".color_container:nth-child(5) p:nth-child(3)").innerHTML = `RGB: ${colors[4].r}, ${colors[4].g}, ${colors[4].b}`;
}

function hexToRGB(selectedColor) {
    let r = parseInt(selectedColor.substring(1, 3), 16);
    let g = parseInt(selectedColor.substring(3, 5), 16);
    let b = parseInt(selectedColor.substring(5, 7), 16);
    let rgb = {
        r,
        g,
        b
    }
    return rgb;
}

function displayHex(colors) {
    document.querySelector(".color_container:nth-child(1) p:nth-child(2)").innerHTML = "HEX: " + colors[0].hex;
    document.querySelector(".color_container:nth-child(2) p:nth-child(2)").innerHTML = "HEX: " + colors[1].hex;
    document.querySelector(".color_container:nth-child(3) p:nth-child(2)").innerHTML = "HEX: " + colors[2].hex;
    document.querySelector(".color_container:nth-child(4) p:nth-child(2)").innerHTML = "HEX: " + colors[3].hex;
    document.querySelector(".color_container:nth-child(5) p:nth-child(2)").innerHTML = "HEX: " + colors[4].hex;
}

function rgbToHex(colors) {
    colors.forEach(colors => {
        colors.hex = "#" + ((1 << 24) + (colors.r << 16) + (colors.g << 8) + colors.b).toString(16).slice(1);
        console.log(colors);

    })
    return colors;
}

function displayHSL(colors) {
    document.querySelector(".color_container:nth-child(1) p:nth-child(4)").innerHTML = `HSL:  ${colors[0].h},  ${colors[0].s}%,  ${colors[0].l}%`;
    document.querySelector(".color_container:nth-child(2) p:nth-child(4)").innerHTML = `HSL:  ${colors[1].h},  ${colors[1].s}%,  ${colors[1].l}%`;
    document.querySelector(".color_container:nth-child(3) p:nth-child(4)").innerHTML = `HSL:  ${colors[2].h},  ${colors[2].s}%,  ${colors[2].l}%`;
    document.querySelector(".color_container:nth-child(4) p:nth-child(4)").innerHTML = `HSL:  ${colors[3].h},  ${colors[3].s}%,  ${colors[3].l}%`;
    document.querySelector(".color_container:nth-child(5) p:nth-child(4)").innerHTML = `HSL:  ${colors[4].h},  ${colors[4].s}%,  ${colors[4].l}%`;
}

function rgbToHSL(rgb) {
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;
    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    h = Math.floor(h);
    s = Math.floor(s);
    l = Math.floor(l);

    let hsl = {
        h,
        s,
        l
    }
    return hsl;
}


function calcHarmony() {
    console.log("calcHarm");
    console.log(hsl);
    let colors;
    if (harmony == "analogous") {
        colors = calcAnalogous();
    }
    if (harmony == "monochromatic") {
        colors = calcMonochromatic();
    }
    if (harmony == "triad") {
        colors = calcTriad();
    }
    if (harmony == "complementary") {
        colors = calcComplementary();
    }
    if (harmony == "compound") {
        colors = calcCompound();
    }
    if (harmony == "shades") {
        colors = calcShades();
    }

    return colors;
}


function calcAnalogous() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].h = hsl.h - 50;
    colors[1].h = hsl.h - 25;
    colors[2].h = hsl.h;
    colors[3].h = hsl.h + 25;
    colors[4].h = hsl.h + 50;

    colors.forEach(hsl => {
        if (hsl.h < 0) {
            hsl.h = (360 + hsl.h);
        }
    })

    return colors;
}

function calcMonochromatic() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].s = hsl.s + 20;
    colors[1].s = hsl.s - 20;
    colors[3].l = hsl.l - 20;
    colors[4].l = hsl.l + 20;

    colors.forEach(hsl => {
        if (hsl.s < 0) {
            hsl.s = 0;
        }
        if (hsl.l < 0) {
            hsl.l = 0;
        }
        if (hsl.s > 100) {
            hsl.s = 100;
        }
        if (hsl.l > 100) {
            hsl.l = 100;
        }
    })
    return colors;
}

function calcTriad() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].h = hsl.h - 120;
    colors[0].l = hsl.l - 30;
    colors[1].h = hsl.h - 120;
    colors[3].h = hsl.h + 120;
    colors[4].h = hsl.h + 120;
    colors[4].l = hsl.l - 30;

    colors.forEach(hsl => {
        if (hsl.h < 0) {
            hsl.h = 360 + hsl.h;
        }
        if (hsl.h > 360) {
            hsl.h = hsl.h - 360;
        }
        if (hsl.l < 0) {
            hsl.l = 100 - hsl.l;
        }

    })
    return colors;
}

function calcComplementary() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].l = hsl.l - 30;
    colors[1].s = hsl.s - 10;
    colors[3].h = hsl.h + 180;
    colors[3].l = hsl.l - 30;
    colors[4].h = hsl.h + 180;

    colors.forEach(hsl => {
        if (hsl.h < 0) {
            hsl.h = (360 + hsl.h);
        }
        if (hsl.h > 360) {
            hsl.h = (hsl.h - 360);
        }
        if (hsl.s < 0) {
            hsl.s = 100 + hsl.s;
        }
        if (hsl.l < 0) {
            hsl.l = 100 + hsl.l;
        }

    })
    console.log(colors);
    return colors;
}

function calcCompound() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].h = hsl.h - 50;
    colors[1].h = hsl.h + 50;
    colors[3].h = hsl.h + 180;
    colors[4].h = hsl.h + 180;
    colors[4].l = hsl.l - 30;


    colors.forEach(hsl => {
        if (hsl.h < 0) {
            hsl.h = (360 + hsl.h);
        }
        if (hsl.h > 360) {
            hsl.h = (hsl.h - 360);
        }
        if (hsl.s < 0) {
            hsl.s = 100 - hsl.s;
        }
        if (hsl.l < 0) {
            hsl.l = 100 - hsl.l;
        }

    })
    console.log(colors);
    return colors;
}

function calcShades() {
    let colors = [{
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        },
        {
            h: hsl.h,
            s: hsl.s,
            l: hsl.l
        }
    ];

    colors[0].l = hsl.l - 20;
    colors[1].l = hsl.l - 10;
    colors[3].l = hsl.l + 10;
    colors[4].l = hsl.l + 20;

    colors.forEach(hsl => {

        if (hsl.l < 0) {
            hsl.l = 100 - hsl.l;
        }
        if (hsl.l > 100) {
            hsl.l = hsl.l - 100;
        }

    })
    console.log(colors);
    return colors;
}