<script lang="ts">
	import { onMount } from 'svelte';
	import * as clustermaker from 'clusters';

	let canvas: HTMLCanvasElement;
	const width = 1000;
	const height = 1000;
	const initialPoints = 1000;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (ctx !== null) {
			draw(ctx, width, height);
		}
	});

	interface Point {
		x: number;
		y: number;
	}

	// k mean

	interface Cluster {
		centroid: number[];
		points: number[][];
	}

	const distance = (a: number[], b: number[]): number => {
		if (a.length != 2 || b.length != 2) {
			return -1;
		} else {
			return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
		}
	};

	const colors = ['#010326', '#125952', '#D9B88F', '#D97059', '#A65B5B'];

	// drawing
	const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
		const points: Point[] = [];
		for (let i = 0; i < initialPoints; i++) {
			const point = {
				x: Math.random() * width,
				y: Math.random() * height
			};
			points.push(point);
		}

		clustermaker.k(5);
		clustermaker.iterations(300);
		clustermaker.data(points.map((it) => [it.x, it.y]));
		let clusters: Cluster[] = clustermaker.clusters();
		console.log(clusters);
		for (let i = 0; i < clusters.length; i++) {
			let cluster = clusters[i];
			ctx.beginPath();
			ctx.moveTo(cluster.points[0][0], cluster.points[0][1]);
			ctx.strokeStyle;
			ctx.fillStyle = colors[i];
			let points = cluster.points
				.sort((a, b) => distance(b, cluster.centroid) - distance(a, cluster.centroid))
				.slice(0, 200);
			// calculate center
			// let centerX = points.map((it) => it[0]).reduce((a, b) => a + b, 0) / points.length;
			// let centerY = points.map((it) => it[1]).reduce((a, b) => a + b, 0) / points.length;
			points = points.sort((a, b) => distance(a, cluster.centroid) - distance(b, cluster.centroid));
			ctx.moveTo(points[0][0], points[0][1]);
			while (points.length > 0) {
				let point = points[0];
				ctx.lineTo(point[0], point[1]);
				// ctx.arc(point[0], point[1], 4, 0, 2 * Math.PI);
				points = points.slice(1);
				points = points.sort((a, b) => distance(b, point) - distance(a, point));

				ctx.stroke();
				// ctx.fill();
			}

			// for (let point of points) {
			// 	ctx.lineTo(point[0], point[1]);
			// 	ctx.arc(point[0], point[1], 4, 0, 2 * Math.PI);
			// 	ctx.stroke();
			// 	// ctx.fill();
			// }
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
