<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 1000;
	const height = 1000;
	const step = 1;
	const white = '#F2F5F1';
	const colors = ['#D40920', '#1356A2', '#F7D842'];

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx !== null) {
			draw(ctx, width, height);
		}
	});

	interface Point {
		x?: number;
		y?: number;
	}

	interface Square {
		x: number;
		y: number;
		width: number;
		height: number;
		color?: string;
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

	function splitSquaresWith(coordinates: Point, squares: Square[]): Square[] {
		const { x, y } = coordinates;

		for (let i = squares.length - 1; i >= 0; i--) {
			const square = squares[i];

			if (x && x > square.x && x < square.x + square.width) {
				if (randomBellCurve() > 0.75) {
					squares.splice(i, 1);
					return splitOnX(square, x);
				}
			}

			if (y && y > square.y && y < square.y + square.height) {
				if (randomBellCurve() > 0.75) {
					squares.splice(i, 1);
					return splitOnY(square, y);
				}
			}
		}
		return [];
	}

	const splitOnX = (
		square: { x: number; y: number; width: number; height: number },
		splitAt: number
	): Square[] => {
		let squareA: Square = {
			x: square.x,
			y: square.y,
			width: square.width - (square.width - splitAt + square.x),
			height: square.height
		};

		let squareB: Square = {
			x: splitAt,
			y: square.y,
			width: square.width - splitAt + square.x,
			height: square.height
		};
		return [squareA, squareB];
	};

	const splitOnY = (square: Square, splitAt: number): Square[] => {
		let squareA: Square = {
			x: square.x,
			y: square.y,
			width: square.width,
			height: square.height - (square.height - splitAt + square.y)
		};

		let squareB: Square = {
			x: square.x,
			y: splitAt,
			width: square.width,
			height: square.height - splitAt + square.y
		};

		return [squareA, squareB];
	};

	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		let squares: Square[] = [
			{
				x: 0,
				y: 0,
				width: width,
				height: height,
				color: ''
			}
		];

		for (let i = 0; i < 5; i++) {
			for (var j = 0; j < width; j += step) {
				splitSquaresWith({ y: j }, squares).forEach((it) => squares.push(it));
				splitSquaresWith({ x: j }, squares).forEach((it) => squares.push(it));
			}
		}

		for (var i = 0; i < colors.length; i++) {
			squares[Math.floor(Math.random() * squares.length)].color = colors[i];
		}
		for (var i = 0; i < squares.length; i++) {
			ctx.beginPath();
			ctx.rect(squares[i].x, squares[i].y, squares[i].width, squares[i].height);
			ctx.fillStyle = squares[i].color ?? white;
			ctx.fill();
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
