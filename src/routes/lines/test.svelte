<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 700;
	const height = 700;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx !== null) {
			draw(ctx, width, height);
		}
	});

	const randomBellCurve = (): number => {
		return (
			(Math.random() +
				Math.random() +
				Math.random() +
				Math.random() +
				Math.random() +
				Math.random() -
				3) /
			3
		);
	};

	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		ctx.lineWidth = 2;

		let step = 2;
		let lines = [];

		// Create the lines
		for (let i = step; i <= width - step; i += step) {
			let line = [];
			let random = randomBellCurve();
			let point = { x: i, y: height / 2 - (height / 2) * random };
			line.push(point);
			point = { x: i, y: height / 2 + (height / 2) * random };
			line.push(point);

			lines.push(line);
		}

		// Do the drawing
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];
			ctx.beginPath();
			ctx.moveTo(step * i, height / 2);
			// let midPoint = {
			// 	x: line[0].x + (line[1].x - line[0].x) * 0.5,
			// 	y: line[0].y + (line[1].y - line[0].y) * 0.5
			// };
			// // translate to midpoint
			// ctx.translate(midPoint.x, midPoint.y);

			// // rotate some angle (radians)
			// ctx.rotate(Math.PI * 0.25); // = 45°

			// // translate back
			// ctx.translate(-midPoint.x, -midPoint.y);
			ctx.moveTo(line[0].x, line[0].y);

			let y = Math.sin((randomBellCurve() * 10 * Math.PI) / 360) * 100 + line[1].y;
			let x = Math.cos((randomBellCurve() * 10 * Math.PI) / 360) * 100 + line[1].x;
			ctx.lineTo(x, y);

			ctx.stroke();
			ctx.closePath();
		}
	};
</script>

<div class="container">
	<canvas bind:this={canvas} {width} {height} />
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: calc(100vh - 1rem);
	}
	canvas {
		border: 1px solid black;
	}
</style>
