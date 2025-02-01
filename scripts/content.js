import { animate } from "https://cdn.jsdelivr.net/npm/motion@latest/+esm";

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Loader
sleep(1000).then(async () => {
	await animate(
		"#followCursor",
		{ height: "10px", width: "10px" },
		{ delay: 0.25, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 }
	).then(() => document.querySelector("#loading").classList.add("hidden"));
});
