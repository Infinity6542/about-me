import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

const circle = document.getElementById("followCursor");
window.onpointermove = (event) => {
	const { clientX, clientY } = event;

	circle.animate(
		{
			left: `${clientX}px`,
			top: `${clientY}px`,
		},
		{ duration: 3300, fill: "forwards" }
	);
};