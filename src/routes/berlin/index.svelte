<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 1000;
	const height = 1000;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx !== null) {
			draw(ctx, width, height);
		}
	});

	interface Point {
		x: number;
		y: number;
		radius: number;
	}

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
		for (let i = 0; i < 20; i++) {
			let varianz = randomBellCurve();

			let circle = {
				x: width / 2,
				y: height / 4,
				radius: (width / 9) * varianz * 2
			};
			ctx.lineWidth = 1;
			// circle
			ctx.beginPath();
			ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
			ctx.stroke();

			// tip
			ctx.beginPath();
			ctx.moveTo(
				width / 2 - circle.radius * Math.sin(0.2),
				height / 4 - circle.radius * Math.cos(0.2)
			);
			ctx.lineTo(width / 2, 30 * varianz);
			ctx.lineTo(
				width / 2 - circle.radius * Math.sin(6.1),
				height / 4 - circle.radius * Math.cos(6.1)
			);
			ctx.stroke();

			// tower part
			ctx.beginPath();
			ctx.moveTo(
				width / 2 - circle.radius * Math.sin(2.8),
				height / 4 - circle.radius * Math.cos(2.8)
			);
			ctx.lineTo(width / 3 + 50 * varianz, height - 20 * varianz);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(
				width / 2 - circle.radius * Math.sin(3.5),
				height / 4 - circle.radius * Math.cos(3.5)
			);
			ctx.lineTo((2 * width) / 3 - 50 * varianz, height - 20 * varianz);
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
