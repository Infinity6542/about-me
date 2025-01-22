import {
	animate,
	stagger,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const circle = document.getElementById("followCursor");

const loaderSequence = [
	[
		"#loading > span",
		{ filter: "blur(0px)", opacity: 1 },
		{
			delay: stagger(2),
			ease: "ease-in",
			duration: 1,
		},
	],
	[
		"#followCursor",
		{ height: "10px", width: "10px" },
		{ delay: 2, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 },
	],
];
sleep(2000).then(async () => {
	await animate(loaderSequence).then(() =>
		document.querySelector("#loading").classList.add("hidden")
	);
});
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
