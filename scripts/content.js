import {
	animate,
	hover,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import {
	createIcons,
	ArrowRight,
	ArrowLeft,
	FileQuestion,
	SquareArrowOutUpRight,
	Mail,
} from "https://cdn.jsdelivr.net/npm/lucide@0.474.0/+esm";

createIcons({
	icons: {
		ArrowRight,
		ArrowLeft,
		FileQuestion,
		SquareArrowOutUpRight,
		Mail,
	},
});

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Loader
await animate(
	"#followCursor",
	{ height: "10px", width: "10px" },
	{ delay: 0.5, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 }
);

document.body.style.overflow = "hidden";

let circle = document.querySelector("#followCursor");
hover("a, .bubble", () => {
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

hover("#proceed", () => {
	console.log("Hovered");
	const circle = document.querySelector("#followCursor");
	circle.style.transition = "all 0.5s ease";
	circle.style.transform = "scale(3)";
	circle.style.clipPath =
		"polygon(0 40%, 60% 40%, 60% 0%, 100% 50%, 60% 100%, 60% 60%, 0 60%)";

	return () => {
		circle.style.clipPath = "none";
		circle.style.transform = "scale(1)";
	};
});

if (document.querySelector("#proceed")) {
	document.querySelector("#proceed").addEventListener("click", async () => {
		let sequence = [
			[
				"#introductory",
				{ opacity: 0, translateY: -100 },
				{ duration: 0.5, ease: "easeIn" },
			],
			[],
		];
		document.body.style.overflowX = "hidden";
		document.body.style.overflowY = "auto";
		// animate(sequence);
		window.scrollBy({ left: 0, top: window.innerHeight, behavior: "smooth" });
	});
}