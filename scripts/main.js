function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

const circle = document.getElementById("followCursor");

let buddy = addEventListener("mousemove", async (event) => {
	const { clientX, clientY } = event;

	circle.style.left = `${clientX}px`;
	circle.style.top = `${clientY}px`;

	circle.animate(
		{
			left: `${clientX}px`,
			top: `${clientY}px`,
		},
		{ duration: 3150, fill: "forwards" }
	);
});

function stopBuddy() {
	removeEventListener("mousemove", buddy);
}

// Next page
async function prepForNextLoader(x) {
	stopBuddy();
	await animate(
		"#followCursor",
		{ height: "250vw", width: "250vw" },
		{ delay: 0.2, ease: "cubic-bezier(.31,-0.01,.07,1.02)", duration: 1 }
	).then(() => (window.location = x));
}

export default stopBuddy;
