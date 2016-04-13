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

	class LngLat {
		lng: number;
		lat: number;

		constructor(lng: number, lat: number);

		/** Return a LngLat as an array */
		toArray(): Array<number>;
		/** Return a LngLat as a string */
		toString(): string;
		/** Return a new LngLat object whose longitude is wrapped to the range (-180, 180). */
		wrap(): LngLat;

		/** Convert an array to a LngLat object, or return an existing LngLat object unchanged. */
		static convert(lngLat: Array<number>): LngLat;
	}
	class Map extends Evented {
		constructor(options: mapOptions);

		addControl(control: Control): this;

		//TODO: Should this take source classes like this, or should it take json objects? probably both?
		addSource(id: string, source: VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource): this;

		addLayer(layer: Layer, before?: string): this;


		getCenter(): LngLat;
		getZoom(): number;
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
		layout?: FillLayout | LineLayout | SymbolLayout;
		paint?: FillPaint | LinePaint | SymbolPaint; //TODO: Other types
		//paint.* 
	}

	interface FillLayout {
		visibility?: "visible" | "none";
	}
	interface FillPaint {
		"fill-antialias"?: boolean;
		"fill-opacity"?: number;
		"fill-color"?: string;
		"fill-outline-color": string;
		"fill-translate"?: Array<number>;
		"fill-translate-anchor"?: "map" | "viewport";
		"fill-pattern"?: "string";
	}

	interface LineLayout {
		visibility?: "visible" | "none";

		"line-cap"?: "butt" | "round" | "square";
		"line-join"?: "bevel" | "round" | "miter";
		"line-miter-limit"?: number;
		"line-round-limit"?: number;
	}
	interface LinePaint {
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

	interface SymbolLayout {
		visibility?: "visible" | "none";

		"symbol-placement"?: "point" | "line";
		"symbol-spacing"?: number;
		"symbol-avoid-edges"?: boolean;
		"icon-allow-overlap"?: boolean;
		"icon-ignore-placement"?: boolean;
		"icon-optional"?: boolean;
		"icon-rotation-alignment"?: "map" | "viewport";
		"icon-size"?: number;
		"icon-image"?: string;
		"icon-rotate"?: number;
		"icon-padding"?: number;
		"icon-keep-upright"?: number;
		"icon-offset"?: Array<number>;
		"text-rotation-alignment"?: "map" | "viewport";
		"text-field"?: string;
		"text-font"?: string;
		"text-size"?: number;
		"text-max-width"?: number;
		"text-line-height"?: number;
		"text-letter-spacing"?: number;
		"text-justify"?: "left" | "center" | "right";
		"text-anchor"?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
		"text-max-angle"?: number;
		"text-rotate"?: number;
		"text-padding"?: number;
		"text-keep-upright"?: boolean;
		"text-transform"?: "none" | "uppercase" | "lowercase";
		"text-offset"?: Array<number>;
		"text-allow-overlap"?: boolean;
		"text-ignore-placement"?: boolean;
		"text-optional"?: boolean;

	}
	interface SymbolPaint {
		"icon-opacity"?: number;
		"icon-color"?: string;
		"icon-halo-color"?: string;
		"icon-halo-width"?: number;
		"icon-halo-blur"?: number;
		"icon-translate"?: Array<number>;
		"icon-translate-anchor"?: "map" | "viewport";
		"text-opacity"?: number;
		"text-color"?: "string";
		"text-halo-color"?: "string";
		"text-halo-width"?: number;
		"text-halo-blur"?: number;
		"text-translate"?: Array<number>;
		"text-translate-anchor"?: "map" | "viewport";
	}



	abstract class Control {
		addTo(map: Map): this;
		remove(): this;
	}

	class Geolocate extends Control {
		constructor(options: {
			position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
		});
	}
}
