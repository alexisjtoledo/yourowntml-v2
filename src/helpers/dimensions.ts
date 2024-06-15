const MOBILE = 70;
const DESKTOP = 100;

document.documentElement.style.setProperty("--MOBILE", `${MOBILE}px`);
document.documentElement.style.setProperty("--DESKTOP", `${DESKTOP}px`);

export { MOBILE, DESKTOP };
