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

export default stopBuddy;
