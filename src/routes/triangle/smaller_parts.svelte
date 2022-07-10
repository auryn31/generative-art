<script lang="ts">
	import { getRandomColor, getRandomValueWithDirection } from '$lib/helper';

	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 700;
	const height = 700;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		// canvas.style.background = getRandomColor();
		if (ctx !== null) {
			draw(ctx, 0, 0, width / 2, height / 2);
			draw(ctx, width / 2, 0, width / 2, height / 2);
			draw(ctx, 0, height / 2, width / 2, height / 2);
			draw(ctx, width / 2, height / 2, width / 2, height / 2);
			draw(ctx, width / 4, height / 4, width / 2, height / 2);
			draw(ctx, 0, -50, width, height);
		}
	});

	const getRandomNumberWithSpread = (): number => {
		return getRandomValueWithDirection() / 10;
	};

	const draw = (
		ctx: CanvasRenderingContext2D,
		offsetx: number,
		offsety: number,
		width: number,
		height: number
	) => {
		ctx.lineWidth = 1;

		// Create the lines

		for (let i = 0; i < 100; i++) {
			ctx.beginPath();
			let startPoint = {
				x: offsetx + width / 2 + width * getRandomNumberWithSpread(),
				y: offsety + height * (0.2 + getRandomNumberWithSpread())
			};
			ctx.moveTo(startPoint.x, startPoint.y);
			ctx.lineTo(
				offsetx + width * (0.8 + getRandomNumberWithSpread()),
				offsety + height * (0.8 + getRandomNumberWithSpread())
			);
			ctx.lineTo(
				offsetx + width * (0.2 + getRandomNumberWithSpread()),
				offsety + height * (0.8 + getRandomNumberWithSpread())
			);
			ctx.lineTo(startPoint.x, startPoint.y);
			ctx.strokeStyle = getRandomColor();
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
