<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	const width = 700;
	const height = 700;
	const minRadius = 2;
	const maxRadius = 100;
	const totalCircles = 10000;
	const createCircleAttempts = 200;

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
		let biggerCircle = {
			x: width / 2,
			y: height / 2,
			radius: width / 2 - 50
		};
		ctx.lineWidth = 1;
		// ctx.beginPath();
		// ctx.arc(biggerCircle.x, biggerCircle.y, biggerCircle.radius, 0, 2 * Math.PI);
		// ctx.stroke();

		const circles: Point[] = [];
		const createAndDrawCircle = () => {
			let newCircle: Point = {
				x: 0,
				y: 0,
				radius: minRadius
			};
			let circleSafeToDraw = false;
			for (let tries = 0; tries < createCircleAttempts; tries++) {
				newCircle = {
					x: Math.floor(randomBellCurve() * width),
					y: Math.floor(randomBellCurve() * height),
					radius: minRadius
				};

				if (doesCircleHaveACollision(newCircle, biggerCircle)) {
					continue;
				} else {
					circleSafeToDraw = true;
					break;
				}
			}

			if (!circleSafeToDraw) {
				return;
			}

			for (let radiusSize = minRadius; radiusSize < maxRadius; radiusSize++) {
				newCircle.radius = radiusSize;
				if (doesCircleHaveACollision(newCircle, biggerCircle)) {
					newCircle.radius--;
					break;
				}
			}
			circles.push(newCircle);
			ctx.beginPath();
			ctx.arc(newCircle.x, newCircle.y, newCircle.radius, 0, 2 * Math.PI);
			ctx.stroke();
		};

		const circleIsInCircle = (circle: Point, biggerCircle: Point) => {
			const distSq = Math.sqrt(
				(circle.x - biggerCircle.x) * (circle.x - biggerCircle.x) +
					(circle.y - biggerCircle.y) * (circle.y - biggerCircle.y)
			);
			if (
				distSq + circle.radius == biggerCircle.radius ||
				distSq + circle.radius < biggerCircle.radius
			) {
				return true;
			} else {
				return false;
			}
		};

		const doesCircleHaveACollision = (circle: Point, biggerCircle: Point) => {
			// collision with inner circle
			if (!circleIsInCircle(circle, biggerCircle)) {
				return true;
			}

			for (var i = 0; i < circles.length; i++) {
				const otherCircle = circles[i];
				const a = circle.radius + otherCircle.radius;
				const x = circle.x - otherCircle.x;
				const y = circle.y - otherCircle.y;

				if (a >= Math.sqrt(x * x + y * y)) {
					return true;
				}
			}

			return false;
		};

		for (let i = 0; i < totalCircles; i++) {
			createAndDrawCircle();
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
