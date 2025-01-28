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
		writeTo.style.background = "#0078d7";
		writeTo.style.setProperty("--content", "|");
		await sleep(250);

		// Word is deleted upon being rewritten

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

// Select
let e = document.getElementById("select");
let options = [];

e.getAttribute("data-options")
	.split(",")
	.forEach((option) => {
		options.push(option);
	});

if (e.getAttribute("data-current") === "") {
	e.setAttribute("data-current", 0);
	e.innerText = options[0];
}

e.addEventListener("click", (event) => {
	event.preventDefault();
	event.stopPropagation();

	function closeMenu() {
		animate("#dropdown", { opacity: 0, scale: 0.8 }, { duration: 0.1 }).then(
			() => {
				document.querySelector("#dropdown").remove();
			}
		);
		return;
	}

	// If a menu is already open, close it
	if (document.querySelectorAll("#dropdown").length === 1) {
		closeMenu();
		return;
	}

	function calcPos(e) {
		let xy = e.getBoundingClientRect();
		return [xy.left, xy.bottom];
	}
	const x = document.createElement("div");
	x.id = "dropdown";
	document.body.insertBefore(x, document.body.nextSibling);
	const y = document.querySelector("#dropdown");
	y.classList.add("flex");
	y.classList.add("vert");
	y.style.position = "absolute";
	y.style.top = `calc(200vh + ${calcPos(e)[1]}px)`;
	y.style.left = `${calcPos(e)[0]}px`;
	y.style.opacity = "0";
	y.style.transform = "scale(.8)";
	y.style.marginTop = "10px";
	y.style.padding = "5px";
	y.style.borderRadius = "6px";
	y.style.gap = "5px";
	y.style.border = "1px solid var(--dimText)";
	animate(y, { opacity: 1, scale: 1 }, { duration: 0.1 });
	y.focus();
	// y.style.width = "100px";
	for (let i = 0; i < options.length; i++) {
		let child = document.createElement("a");

		// divider
		let divider = document.createElement("hr");
		divider.style.width = "100%";

		child.innerText = options[i].charAt(0).toUpperCase() + options[i].slice(1);
		child.href = `javascript:void`;
		child.onclick = (event) => {
			e.innerText = options[i];
			animate(
				circle,
				{ height: "250vw", width: "250vw" },
				{ duration: 0.5 }
			).then(() => {
				window.location = `/${options[i].replace(" ", "-")}.html`;
			});
		};
		child.style.textDecoration = "none";
		child.style.color = "var(--text)";
		child.style.padding = "5px 50px 5px 20px";
		child.style.lineHeight = "1.5";
		child.style.borderRadius = "3px";
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
		document.body.addEventListener("click", (event) => {
			closeMenu();
		});
	});
	y.addEventListener("click", (event) => {
		event.stopPropagation();
	});
});
