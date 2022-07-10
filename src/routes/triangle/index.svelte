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
			draw(ctx, width, height);
		}
	});

	const getRandomValue = (): number => {
		return getRandomValueWithDirection() / 10;
	};

	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		ctx.lineWidth = 1;

		// Create the lines

		for (let i = 0; i < 200; i++) {
			ctx.beginPath();
			let startPoint = {
				x: width / 2 + width * getRandomValue(),
				y: height * (0.2 + getRandomValue())
			};
			ctx.moveTo(startPoint.x, startPoint.y);
			ctx.lineTo(width * (0.8 + getRandomValue()), height * (0.8 + getRandomValue()));
			ctx.lineTo(width * (0.2 + getRandomValue()), height * (0.8 + getRandomValue()));
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
