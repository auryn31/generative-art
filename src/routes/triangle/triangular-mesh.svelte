<script lang="ts">
	import type { Point } from '$lib/model';

	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 800;
	const height = 700;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		// canvas.style.background = getRandomColor();
		if (ctx !== null) {
			ctx.lineJoin = 'bevel';
			draw(ctx, width, height);
		}
	});

	const getRandomColor = (): string => {
		// const colors = ['#727273', '#00010D', '#F2F2F2', '#BFBFBF', '#262626']; // gray
		const colors = ['#010326', '#125952', '#D9B88F', '#D97059', '#A65B5B']; //red green
		// const colors = ['#BFBFBF', '#8C8C8C', '#595959', '#262626', '#0D0D0D'];
		// const colors = ['#729CA6', '#1E5933', '#01260A', '#75A60D', '#0D0D0D']; // green
		return colors[Math.round(Math.random() * colors.length)];
	};

	const drawTriangle = (
		ctx: CanvasRenderingContext2D,
		pointA: Point,
		pointB: Point,
		pointC: Point
	) => {
		ctx.beginPath();
		ctx.moveTo(pointA.x, pointA.y);
		ctx.lineTo(pointB.x, pointB.y);
		ctx.lineTo(pointC.x, pointC.y);
		ctx.lineTo(pointA.x, pointA.y);
		ctx.closePath();
		ctx.fillStyle = getRandomColor();
		ctx.fill();
		ctx.stroke();
	};

	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		ctx.lineWidth = 1;

		let lines = [];
		let gap = width / 10;
		let odd = false;
		for (var y = gap / 2; y <= height; y += gap) {
			odd = !odd;
			let line = [];
			for (var x = gap / 2; x <= width; x += gap) {
				line.push({
					x: x + (Math.random() * 0.7 - 0.3) * gap + (odd ? gap / 2 : 0),
					y: y + (Math.random() * 0.7 - 0.3) * gap
				});
				ctx.beginPath();
				ctx.fill();
			}
			lines.push(line);
		}
		for (var y = 0; y < lines.length - 1; y++) {
			odd = !odd;
			let dotLine = [];
			for (var i = 0; i < lines[y].length; i++) {
				dotLine.push(odd ? lines[y][i] : lines[y + 1][i]);
				dotLine.push(odd ? lines[y + 1][i] : lines[y][i]);
			}
			for (var i = 0; i < dotLine.length - 2; i++) {
				drawTriangle(ctx, dotLine[i], dotLine[i + 1], dotLine[i + 2]);
			}
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
</style>
