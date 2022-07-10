import type { Circle, Point } from '$lib/model';

const circleIsInCircle = (circle: Circle, biggerCircle: Circle) => {
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

const pointIsInCircle = (point: Point, circle: Circle) => {
	const smallerCircle = { x: point.x, y: point.y, radius: 1 };
	return circleIsInCircle(smallerCircle, circle);
};

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

const distance = (a: number[], b: number[]): number => {
	if (a.length != 2 || b.length != 2) {
		return -1;
	} else {
		return Math.sqrt((b[0] - a[0]) * (b[0] - a[0]) + (b[1] - a[1]) * (b[1] - a[1]));
	}
};

// https://www.nayuki.io/res/convex-hull-algorithm/convex-hull.ts
// https://www.nayuki.io/page/convex-hull-algorithm
// Returns a new array of points representing the convex hull of
// the given set of points. The convex hull excludes collinear points.
// This algorithm runs in O(n log n) time.
const makeHull = <P extends Point>(points: Readonly<Array<P>>): Array<P> => {
	const newPoints: Array<P> = points.slice();
	newPoints.sort(POINT_COMPARATOR);
	return makeHullPresorted(newPoints);
};

// Returns the convex hull, assuming that each points[i] <= points[i + 1]. Runs in O(n) time.
const makeHullPresorted = <P extends Point>(points: Readonly<Array<P>>): Array<P> => {
	if (points.length <= 1) return points.slice();

	// Andrew's monotone chain algorithm. Positive y coordinates correspond to "up"
	// as per the mathematical convention, instead of "down" as per the computer
	// graphics convention. This doesn't affect the correctness of the result.

	const upperHull: Array<P> = [];
	for (let i = 0; i < points.length; i++) {
		const p: P = points[i];
		while (upperHull.length >= 2) {
			const q: P = upperHull[upperHull.length - 1];
			const r: P = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();

	const lowerHull: Array<P> = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p: P = points[i];
		while (lowerHull.length >= 2) {
			const q: P = lowerHull[lowerHull.length - 1];
			const r: P = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();

	if (
		upperHull.length == 1 &&
		lowerHull.length == 1 &&
		upperHull[0].x == lowerHull[0].x &&
		upperHull[0].y == lowerHull[0].y
	)
		return upperHull;
	else return upperHull.concat(lowerHull);
};

const POINT_COMPARATOR = (a: Point, b: Point): number => {
	if (a.x < b.x) return -1;
	else if (a.x > b.x) return +1;
	else if (a.y < b.y) return -1;
	else if (a.y > b.y) return +1;
	else return 0;
};

const pointIsInPoly = (p: Point, polygon: Point[]) => {
	let isInside = false;
	let minX = polygon[0].x,
		maxX = polygon[0].x;
	let minY = polygon[0].y,
		maxY = polygon[0].y;
	for (let n = 1; n < polygon.length; n++) {
		const q = polygon[n];
		minX = Math.min(q.x, minX);
		maxX = Math.max(q.x, maxX);
		minY = Math.min(q.y, minY);
		maxY = Math.max(q.y, maxY);
	}

	if (p.x < minX || p.x > maxX || p.y < minY || p.y > maxY) {
		return false;
	}

	let i = 0,
		j = polygon.length - 1;
	for (j; i < polygon.length; j = i++) {
		if (
			polygon[i].y > p.y != polygon[j].y > p.y &&
			p.x <
				((polygon[j].x - polygon[i].x) * (p.y - polygon[i].y)) / (polygon[j].y - polygon[i].y) +
					polygon[i].x
		) {
			isInside = !isInside;
		}
	}

	return isInside;
};

const getRandomColor = (): string => {
	// const colors = ['#727273', '#00010D', '#F2F2F2', '#BFBFBF', '#262626']; // gray
	// const colors = ['#010326', '#125952', '#D9B88F', '#D97059', '#A65B5B'];
	// const colors = ['#BFBFBF', '#8C8C8C', '#595959', '#262626', '#0D0D0D'];
	const colors = ['#729CA6', '#1E5933', '#01260A', '#75A60D', '#0D0D0D']; // green
	return colors[Math.round(Math.random() * colors.length)];
};

const getRandomDirection = (): number => {
	if (Math.random() > 0.5) {
		return 1;
	} else {
		return -1;
	}
};
const getRandomValueWithDirection = (): number => {
	return Math.random() * getRandomDirection();
};

export {
	circleIsInCircle,
	pointIsInCircle,
	randomBellCurve,
	distance,
	makeHull,
	pointIsInPoly,
	getRandomColor,
	getRandomValueWithDirection
};
