import {
	animate,
	stagger,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function prepForNextLoader(x) {
	await animate(
		"#followCursor",
		{ height: "250vw", width: "250vw" },
		{ delay: 0.2, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 }
	).then(() => (window.location = x));
}

const roles = ["developer", "designer", "photographer"];
let index = 0;

const circle = document.getElementById("followCursor");

const typewriter = async () => {
	while (true) {
		const writeTo = document.getElementById("role");
		let word = roles[index];
		let delay = 80;

		// Write the word
		writeTo.style.setProperty(
			"--content",
			''
		);
		writeTo.style.setProperty("--animation", "none");
		for (let i = 0; i < word.length; i++) {
			if (writeTo.style.background !== "transparent")
				writeTo.style.background = "transparent";
			writeTo.innerText = word.substring(0, i + 1);
			await sleep(delay);
		}
		writeTo.style.setProperty(
			"--animation",
			"blink .5s infinite linear alternate"
		);
		await sleep(delay * 15);

		// Make it look selected for rewrite
		writeTo.style.background = "#0078d7";
		writeTo.style.setProperty(
			"--content",
			'|'
		);
		await sleep(300);

		// Delete the word

		// Cycle
		if (index === roles.length - 1) index = 0;
		else index++;
	}
};

const loaderSequence = [
	[
		"#loading > span",
		{ filter: "blur(0px)", opacity: 1 },
		{
			delay: stagger(2),
			ease: "ease-in",
			duration: 0.5,
		},
	],
	[
		"#followCursor",
		{ height: "10px", width: "10px" },
		{ delay: 0.5, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 },
	],
];

sleep(1000).then(async () => {
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

typewriter();
// splt({reveal: true});
// animate(".reveal")