import {
	animate,
	hover,
} from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";
import {
	createIcons,
	ArrowRight,
} from "https://cdn.jsdelivr.net/npm/lucide@0.474.0/+esm";
import {
	interpolate,
	fromCircle,
	toCircle,
} from "https://cdn.jsdelivr.net/npm/flubber@0.4.2/+esm";

createIcons({
	icons: {
		ArrowRight,
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
