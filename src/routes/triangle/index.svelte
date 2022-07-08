<script lang="ts">
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

	const getRandomDirection = (): number => {
		if (Math.random() > 0.5) {
			return 1;
		} else {
			return -1;
		}
	};
	const getRandomValue = (): number => {
		return (Math.random() / 10) * getRandomDirection();
	};

	const getRandomColor = (): string => {
		// const colors = ['#727273', '#00010D', '#F2F2F2', '#BFBFBF', '#262626']; // gray
		// const colors = ['#010326', '#125952', '#D9B88F', '#D97059', '#A65B5B'];
		// const colors = ['#BFBFBF', '#8C8C8C', '#595959', '#262626', '#0D0D0D'];
		const colors = ['#729CA6', '#1E5933', '#01260A', '#75A60D', '#0D0D0D']; // green
		return colors[Math.round(Math.random() * colors.length)];
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
