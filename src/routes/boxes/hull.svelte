<script lang="ts">
	import { onMount } from 'svelte';
	import * as clustermaker from 'clusters';
	import { makeHull, pointIsInCircle, pointIsInPoly } from '$lib/helper';
	import type { Circle, Point } from '$lib/model';

	let canvas: HTMLCanvasElement;
	const width = 1000;
	const height = 1000;
	const initialPoints = 5000;
	const colors = ['#010326', '#125952', '#D9B88F', '#D97059', '#A65B5B'];

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx !== null) {
			draw(
				ctx,
				width,
				height,
				[
					{ x: 0, y: 0 },
					{ x: 0, y: height },
					{ x: width, y: height },
					{ x: width, y: 0 }
				],
				1
			);
		}
	});

	// k mean

	interface Cluster {
		centroid: number[];
		points: number[][];
	}

	const circle: Circle = {
		x: width / 2,
		y: height / 2,
		radius: width / 2 - 50
	};

	// drawing
	const draw = (
		ctx: CanvasRenderingContext2D,
		width: number,
		height: number,
		poligon: Point[],
		depth: number
	) => {
		const points: Point[] = [];
		while (points.length < initialPoints / depth) {
			const point = {
				x: Math.random() * width,
				y: Math.random() * height
			};
			if (depth == 1) {
				if (pointIsInCircle(point, circle)) points.push(point);
			} else {
				if (pointIsInPoly(point, poligon)) points.push(point);
			}
		}

		clustermaker.k(3);
		clustermaker.iterations(100);
		clustermaker.data(points.map((it) => [it.x, it.y]));
		let clusters: Cluster[] = clustermaker.clusters();
		for (let i = 0; i < clusters.length; i++) {
			let cluster = clusters[i];
			ctx.beginPath();
			ctx.moveTo(cluster.points[0][0], cluster.points[0][1]);
			ctx.strokeStyle;
			ctx.fillStyle = colors[i];

			const points: Point[] = cluster.points.map((it) => ({ x: it[0], y: it[1] }));
			const hull = makeHull(points);

			if (depth < 4 && Math.random() > 0.5) {
				draw(ctx, width, height, hull, depth + 1);
			} else {
				ctx.moveTo(hull[0].x, hull[0].y);
				for (let point of hull) {
					ctx.lineTo(point.x, point.y);
				}
				ctx.lineTo(hull[0].x, hull[0].y);
				// ctx.stroke();
				ctx.fillStyle = colors[0];
				ctx.fill();
			}
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
</style>
