let total = 19;
let pause = 2;
let move = 1;
let step = pause + move;
let total_time = total * step;

let css = '';
css += '@keyframes marquee {\n';
for (let i = 0; i <= total; i++) {
    let start = i * step;
    let end = start + pause;
    let pst = (start / total_time * 100).toFixed(2);
    let pet = (end / total_time * 100).toFixed(2);
    let pos = i * 444;
    if (i === total) {
        css += `  100% { transform: translateX(calc(50vw - 210px - ${pos}px)); }\n`;
    } else {
        css += `  ${pst}%, ${pet}% { transform: translateX(calc(50vw - 210px - ${pos}px)); }\n`;
    }
}
css += '}\n';

css += '/* Mobile marquee */\n';
css += '@keyframes marqueeMobile {\n';
for (let i = 0; i <= total; i++) {
    let start = i * step;
    let end = start + pause;
    let pst = (start / total_time * 100).toFixed(2);
    let pet = (end / total_time * 100).toFixed(2);
    let pos = i * 316;
    if (i === total) {
        css += `  100% { transform: translateX(calc(50vw - 150px - ${pos}px)); }\n`;
    } else {
        css += `  ${pst}%, ${pet}% { transform: translateX(calc(50vw - 150px - ${pos}px)); }\n`;
    }
}
css += '}\n';

console.log(css);
