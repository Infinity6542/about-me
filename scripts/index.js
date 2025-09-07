import {
	animate,
	hover,
	stagger,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import stopBuddy from "./main.js";

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Loader
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

// Typewriter effect on the index page, first section
const roles = ["developer", "designer", "photographer"];
const circle = document.getElementById("followCursor");
let index = 0;
const typewriter = async () => {
	while (true) {
		const writeTo = document.getElementById("role");
		let word = roles[index];
		let delay = 80;

		Object.assign(writeTo.style, {
			position: "relative",
			zIndex: "-1",
		});

		// Write the word
		// No blink while writing
		writeTo.style.setProperty("--content", "");
		writeTo.style.setProperty("--animation", "none");
		for (let i = 0; i < word.length; i++) {
			if (writeTo.style.background !== "transparent")
				writeTo.style.background = "transparent";
			writeTo.innerText = word.substring(0, i + 1);
			await sleep(delay);
		}

		// Blink after the word is written
		writeTo.style.setProperty(
			"--animation",
			"blink .35s infinite linear alternate"
		);

		await sleep(delay * 25);

		// Make it look selected for rewrite
		writeTo.style.background = "#005ba3";
		writeTo.style.setProperty("--content", "|");
		await sleep(250);

		// Word is deleted upon being rewritten

		// Cycle
		if (index === roles.length - 1) index = 0;
		else index++;

		// Ball turns into line
		hover("h1:not(#loading)", () => {
			animate(
				circle,
				{ height: "50px", width: "5px", borderRadius: "5px" },
				{ duration: 0.25, ease: "ease-out" }
			);

			return () =>
				animate(
					circle,
					{ height: "10px", width: "10px", borderRadius: "50%" },
					{ duration: 0.25, ease: "ease-out" }
				);
		});
	}
};

//* Select dropdown menu
let e = document.getElementById("select");
let options = [];

// Get all the elements to add them later
e.getAttribute("data-options")
	.split(",")
	.forEach((option) => {
		options.push(option);
	});

if (e.getAttribute("data-current") === "") {
	e.setAttribute("data-current", 0);
	e.innerText = options[0];
}

// Activate the menu upon click
e.addEventListener("click", (event) => {
	event.preventDefault();
	event.stopImmediatePropagation();

	async function closeMenu() {
		document.body.removeEventListener("click", closeMenu);
		await animate("#dropdown", { opacity: 0, scale: 0.8 }, { duration: 0.1 }).then(
			() => {
				document.querySelector("#dropdown").remove();
			}
		);
	}

	// If a menu is already open, close it
	if (document.querySelectorAll("#dropdown").length === 1) {
		closeMenu();
		return;
	}

	// Get position to know where to put the menu
	function calcPos(e) {
		let xy = e.getBoundingClientRect();
		return [xy.left, xy.bottom];
	}

	// Creating the menu
	const x = document.createElement("div");
	x.id = "dropdown";
	document.body.insertBefore(x, document.body.nextSibling);
	const y = document.querySelector("#dropdown");
	Object.assign(y.style, {
		position: "absolute",
		top: `calc(200vh + ${calcPos(e)[1]}px)`,
		left: `${calcPos(e)[0]}px`,
		opacity: ".5",
		transform: "scale(.5)",
		marginTop: "10px",
		padding: "5px",
		borderRadius: "6px",
		gap: "5px",
		border: "1px solid var(--dimText)",
		transformOrigin: "top center",
	});
	y.classList.add("flex");
	y.classList.add("vert");
	animate(y, { opacity: 1, scale: 1 }, { duration: 0.1 });
	y.focus();

	// Add the options to the menu
	for (let i = 0; i < options.length; i++) {
		let child = document.createElement("a");

		// divider
		let divider = document.createElement("hr");
		divider.style.width = "100%";

		child.innerText = options[i].charAt(0).toUpperCase() + options[i].slice(1);
		// child.href = `work.html`;
		child.onclick = (event) => {
			sleep(500).then(() => {
				e.innerText = options[i];
				animate(
					circle,
					{ height: "250vw", width: "250vw" },
					{ duration: 0.5 }
				).then(() => {
					prepForNextLoader(`/${options[i].replace(" ", "-")}.html`);
				});
			});
		};
		Object.assign(child.style, {
			textDecoration: "none",
			color: "var(--text)",
			padding: "5px 50px 5px 20px",
			lineHeight: "1.5",
			borderRadius: "3px",
			cursor: "pointer",
		});
		child.addEventListener("mouseover", (event) => {
			event.target.style.transition = ".2s all ease-in-out";
			event.target.style.background = "var(--dimText)";
		});
		child.addEventListener("mouseout", (event) => {
			event.target.style.background = "transparent";
		});
		y.appendChild(child);
		// if (i >= options.length - 1) {
		// 	return;
		// }
		// y.insertBefore(divider, y.nextSibling);
	}
	sleep(200).then(() => {
		document.body.addEventListener("click", closeMenu);
	});
	y.addEventListener("click", (event) => {
		event.stopPropagation();
	});
	hover("a, #select", () => {
		animate(
			circle,
			{ height: "20px", width: "20px" },
			{ duration: 0.75, type: "spring", bounce: 0.7 }
		);

		return () =>
			animate(
				circle,
				{ height: "10px", width: "10px" },
				{ duration: 0.75, type: "spring", bounce: 0.7 }
			);
	});
});

typewriter();
