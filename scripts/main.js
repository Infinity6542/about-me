// import {
// 	animate,
// 	stagger,
// 	hover,
// } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const circle = document.getElementById("followCursor");

window.onpointermove = (event) => {
	const { clientX, clientY } = event;

	circle.animate(
		{
			left: `${clientX}px`,
			top: `${clientY}px`,
		},
		{ duration: 3150, fill: "forwards" }
	);
};

window.onload = () => {
	const { clientX, clientY } = event;

	circle.animate(
		{
			left: `${clientX}px`,
			top: `${clientY}px`,
		},
		{ duration: 3150, fill: "forwards" }
	);
};