/**
 * https://github.com/apache/echarts/blob/master/src/coord/geo/parseGeoJson.ts
 * decode functions are copied from echarts
 */
const decodeRing = (coordinate: string, encodeOffsets: number[], encodeScale: number): number[][] => {
	const result = [];
	let prevX = encodeOffsets[0];
	let prevY = encodeOffsets[1];

	for (let i = 0; i < coordinate.length; i += 2) {
		let x = coordinate.charCodeAt(i) - 64;
		let y = coordinate.charCodeAt(i + 1) - 64;
		// ZigZag decoding
		x = (x >> 1) ^ (-(x & 1));
		y = (y >> 1) ^ (-(y & 1));
		// Delta deocding
		x += prevX;
		y += prevY;

		prevX = x;
		prevY = y;
		// Dequantize
		result.push([x / encodeScale, y / encodeScale]);
	}

	return result;
};

const decodeRings = (rings: string[], encodeOffsets: number[][], encodeScale: number) => {
	for (let c = 0; c < rings.length; c++) {
		rings[c] = decodeRing(
			rings[c],
			encodeOffsets[c],
			encodeScale
		) as any;
	}
};

export const decode = (json: any): any => {
	if (!json.UTF8Encoding) {
		return json;
	}
	const jsonCompressed = json;
	let encodeScale = jsonCompressed.UTF8Scale;
	if (encodeScale == null) {
		encodeScale = 1024;
	}

	const features = jsonCompressed.features;
	features.forEach((feature: any) => {
		const geometry = feature.geometry;
		const encodeOffsets = geometry.encodeOffsets;
		const coordinates = geometry.coordinates;

		// Geometry may be appeded manually in the script after json loaded.
		// In this case this geometry is usually not encoded.
		if (!encodeOffsets) {
			return;
		}

		switch (geometry.type) {
			case 'LineString':
				(geometry as any).coordinates =
					decodeRing(coordinates as string, encodeOffsets as number[], encodeScale);
				break;
			case 'Polygon':
				decodeRings(coordinates as string[], encodeOffsets as number[][], encodeScale);
				break;
			case 'MultiLineString':
				decodeRings(coordinates as string[], encodeOffsets as number[][], encodeScale);
				break;
			case 'MultiPolygon':
				(coordinates as string[][]).forEach(
					(rings, idx) => decodeRings(rings, (encodeOffsets as number[][][])[idx], encodeScale)
				);
		}
	});
	// Has been decoded
	jsonCompressed.UTF8Encoding = false;

	return jsonCompressed;
};

export const computeMiddlePoint = (points: Array<[number, number]>): { latitude: number, longitude: number } => {
	let {x, y, z} = points.map(([longitude, latitude]) => {
		// console.log(longitude, latitude);
		return {longitude: longitude * Math.PI / 180, latitude: latitude * Math.PI / 180};
	}).map(({longitude, latitude}) => {
		// console.log(longitude, latitude);
		const cosLat = Math.cos(latitude);
		return {x: cosLat * Math.cos(longitude), y: cosLat * Math.sin(longitude), z: Math.sin(latitude)};
	}).reduce(({x: xa, y: ya, z: za}, {x, y, z}) => {
		return {x: xa + x, y: ya + y, z: za + z};
	}, {x: 0, y: 0, z: 0});
	// console.log(x, y, z);

	const weight = points.length;
	x = x / weight;
	y = y / weight;
	z = z / weight;

	return {
		latitude: Math.atan2(z, Math.sqrt(x * x + y * y)) * 180 / Math.PI,
		longitude: Math.atan2(y, x) * 180 / Math.PI
	};
};