declare class mapboxgl {
	static accessToken: string;
}

declare namespace mapboxgl {
	interface mapOptions {
		/** ID of the container element */
		container?: string;

		/** stylesheet location */
		style?: string;

		/** initial map center */
		center?: Array<number>;

		/** Initial zoom level */
		zoom?: number
	}

	interface Source {
		type: "vector" | "raster" | "geojson" | "image" | "video";
	}

	class Evented {
		fire(type: string, data?: any): this;
		listens(type: string): boolean;
		off(type: string, listener: Function): this;
		on(type: string, listener: Function): this;
		once(type: string, listener: Function): this;
	}

	class Map extends Evented {
		constructor(options: mapOptions);

		//TODO: Should this take source classes like this, or should it take json objects? probably both?
		addSource(id: string, source: VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource): this;

		addLayer(layer: Layer, before?: string): this;
	}

	/** TODO: Should be a class */
	interface VectorSource extends Source {
		type: "vector";
		url: string;
	}

	/** TODO: Should be a class */
	interface RasterSource extends Source {
		type: "raster";
		url: string;
		tileSize: number
	}

	class GeoJSONSource implements Source {
		type: "geojson";

		constructor(options: { data: GeoJSON.GeoJsonObject });

		setData(data: string | GeoJSON.GeoJsonObject): void;
	}

	/** TODO: Should be a class */
	interface ImageSource extends Source {
		type: "image";
		url: string;

		/** [longitude, latitude] pairs for the image corners listed in clockwise order: top left, top right, bottom right, bottom left. */
		coordinates: Array<Array<number>>
	}

	interface VideoSource extends Source {
		type: "video";

		urls: Array<string>;

		/** [longitude, latitude] pairs for the video corners listed in clockwise order: top left, top right, bottom right, bottom left. */
		coordinates: Array<Array<number>>
	}


	interface Layer {
		id: string;
		type?: "fill" | "line" | "symbol" | "circle" | "raster" | "background";

		//metadata
		//ref
		
		/** Docs say this is optional but errors say it isn't */
		source: string;

		"source-layer"?: string;

		minzoom?: number;
		maxzoom?: number;

		interactive?: boolean;

		//filter?:
		//layout
		paint?: FillPaint | LinePaint; //TODO: Other types
		//paint.* 
	}

	interface FillPaint {
		visibility?: "visible" | "none";

		"fill-antialias"?: boolean;
		"fill-opacity"?: number;
		"fill-color"?: string;
		"fill-outline-color": string;
		"fill-translate"?: Array<number>;
		"fill-translate-anchor"?: "map" | "viewport";
		"fill-pattern"?: "string";
	}

	interface LinePaint {
		visibility?: "visible" | "none";

		"line-cap"?: "butt" | "round" | "square";
		"line-join"?: "bevel" | "round" | "miter";
		"line-miter-limit"?: number;
		"line-round-limit"?: number;

		"line-opacity"?: number;
		"line-color"?: string;
		"line-translate"?: Array<number>;
		"line-translate-anchor"?: "map" | "viewport";
		"line-width"?: number;
		"line-gap-width"?: number;
		"line-offset"?: number;
		"line-blur"?: number;
		"line-dasharray"?: Array<number>;
		"line-pattern"?: string;
	}
}
