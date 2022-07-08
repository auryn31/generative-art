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
		return randn_bm(0, 1);
	};
	const randn_bm = (min: number, max: number): number => {
		let u = 0,
			v = 0;
		while (u === 0) u = Math.random();
		while (v === 0) v = Math.random();
		let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
		num = num / 10.0 + 0.5;
		if (num > 1 || num < 0) num = randn_bm(min, max);
		return num;
	};

	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		ctx.lineWidth = 2;

		let step = 10;
		let lines = [];

		// Create the lines
		for (let i = step; i <= height - step; i += step) {
			let line = [];
			for (let j = step; j <= width - step; j += step) {
				let variance = i * (1 / (width - i)) * j;
				let random = ((randomBellCurve() * variance) / 100) * -1;
				let point = { x: j, y: i + random };
				line.push(point);
			}
			lines.push(line);
		}

		// Do the drawing
		for (let i = 0; i < lines.length; i++) {
			ctx.beginPath();
			ctx.moveTo(lines[i][0].x, lines[i][0].y);

			for (let j = 0; j < lines[i].length; j++) {
				ctx.lineTo(lines[i][j].x, lines[i][j].y);
			}

			ctx.stroke();
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
