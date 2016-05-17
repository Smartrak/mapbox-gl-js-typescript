//import GeoJSON = require('geojson');

declare class mapboxgl {
  static accessToken:string;
}

declare namespace mapboxgl {
  interface MapOptions {

    /** If true, an attribution control will be added to the map. */
    attributionControl?:boolean;

    /** Snap to north threshold in degrees. */
    bearingSnap?:number;

    /** If true, enable the "box zoom" interaction (see BoxZoomHandler) */
    boxZoom?:boolean;

    /** initial map center */
    center?:Array<number>;

    /** Style class names with which to initialize the map */
    classes?:Array<string>;

    /** ID of the container element */
    container?:string;

    /** If true, enable the "double click to zoom" interaction (see DoubleClickZoomHandler). */
    doubleClickZoom?:boolean;

    /** If true, enable the "drag to pan" interaction (see DragPanHandler). */
    dragPan?:boolean;

    /** If true, enable the "drag to rotate" interaction (see DragRotateHandler). */
    dragRotate?:boolean;

    /** If true, map creation will fail if the implementation determines that the performance of the created WebGL context would be dramatically lower than expected. */
    failIfMajorPerformanceCaveat?:boolean;

    /** If true, the map will track and update the page URL according to map position */
    hash?:boolean;

    /** If false, no mouse, touch, or keyboard listeners are attached to the map, so it will not respond to input */
    interactive?:boolean;

    /** If true, enable keyboard shortcuts (see KeyboardHandler). */
    keyboard?:boolean;

    /** If set, the map is constrained to the given bounds. */
    maxBounds?:LngLatBounds | Array<Array<number>>;

    /** Maximum zoom of the map */
    maxZoom?:number;

    /** Minimum zoom of the map */
    minZoom?:number;

    /** If true, The maps canvas can be exported to a PNG using map.getCanvas().toDataURL();. This is false by default as a performance optimization. */
    preserveDrawingBuffer?:boolean;

    /** If true, enable the "scroll to zoom" interaction */
    scrollZoom?:boolean;

    /** stylesheet location */
    style?:string|Style; //TODO: Can be an object too

    /** If true, enable the "pinch to rotate and zoom" interaction (see TouchZoomRotateHandler). */
    touchZoomRotate?:boolean;

    /** Initial zoom level */
    zoom?:number
  }

  interface Style {
    bearing?:number;
    center?:Array<number>;
    glyphs?:string;
    layers?:Array<Layer>;
    metadata?:any;
    name?:string;
    pitch?:number;
    sources?:any;
    sprite?:string;
    transition?:Transition;
    version:number;
    zoom?:number;
  }

  interface Transition {
    delay?:number;
    duration?:number;
  }

  interface Source {
    type:"vector" | "raster" | "geojson" | "image" | "video";
  }

  class Evented {
    fire(type:string, data?:any):this;

    listens(type:string):boolean;

    off(type:string, listener:Function):this;

    on(type:string, listener:Function):this;

    once(type:string, listener:Function):this;
  }

  class LngLat {
    lng:number;
    lat:number;

    constructor(lng:number, lat:number);

    /** Return a LngLat as an array */
    toArray():Array<number>;

    /** Return a LngLat as a string */
    toString():string;

    /** Return a new LngLat object whose longitude is wrapped to the range (-180, 180). */
    wrap():LngLat;

    /** Convert an array to a LngLat object, or return an existing LngLat object unchanged. */
    static convert(lngLat:Array<number>):LngLat;
  }

  class LngLatBounds {
    constructor(sw:LngLat, ne:LngLat);

    /** Extend the bounds to include a given LngLat or LngLatBounds. */
    extend(obj:LngLat | LngLatBounds):this;

    /** Get the point equidistant from this box's corners */
    getCenter():LngLat;

    /** Get east edge longitude */
    getEast():number;

    /** Get north edge latitude */
    getNorth():number;

    /** Get northeast corner */
    getNorthEast():LngLat;
    /** Get northwest corner */
    getNorthEast():LngLat;

    /** Get south edge latitude */
    getSouth():number;

    /** Get southeast corner */
    getSouthEast():LngLat;

    /** Get southwest corner */
    getSouthWest():LngLat;

    /** Get west edge longitude */
    getWest():number;

    /** Returns a LngLatBounds as an array */
    toArray():Array<Array<number>>;

    /** Return a LngLatBounds as a string */
    toString():string;

    /** Convert an array to a LngLatBounds object, or return an existing LngLatBounds object unchanged. */
    static convert(input:LngLatBounds | Array<number> | Array<Array<number>>):LngLatBounds;
  }

  class Point {
    x:number;
    y:number;

    constructor(x:number, y:number);

    clone():Point;

    add(point:Point):Point;

    sub(point:Point):Point;

    mult(point:Point):Point;

    div(point:Point):Point;

    rotate(angle:number):Point;

    matMult(transformMatrix:Array<number>):Point;

    unit():Point;

    perp():Point;

    round():Point;

    mag():number;

    equals(point:Point):boolean;

    dist(point:Point):number;

    distSqr(point:Point):number;

    angle():number;

    angleTo(point:Point):number;

    angleWith(point:Point):number;

    angleWithStep(x:number, y:number):number;

    static convert(point:Point|Array<Number>):Point;
  }

  class Map extends Evented {
    constructor(options:MapOptions);

    addControl(control:Control):this;

    addClass(klass:string, options?:StyleOptions):this;

    removeClass(klass:string, options?:StyleOptions):this;

    setClasses(klasses:Array<string>, options?:StyleOptions):this;

    hasClass(klass:string):boolean;

    getClasses():Array<string>;

    resize():this;

    getBounds():LngLatBounds;

    setMaxBounds(bounds:LngLatBounds|Array<Array<number>>|null|undefined):this;

    setMinZoom(minZoom:number):this;

    setMaxZoom(maxZoom:number):this;

    project(lnglat:LngLat):{ x:number, y:number };

    unproject(point:Array<number>):LngLat;

    queryRenderedFeatures(pointOrBox?:Point|Array<number>|Array<Point>|Array<Array<number>>, params?:{layers?:Array<string>,filter?:Array<any>}):Array<GeoJSON.Feature>;

    querySourceFeatures(sourceID:string, params?:{sourceLayer?:string,filter?:Array<any>}):Array<GeoJSON.Feature>;

    setStyle(style:Style):this;

    getStyle():Style;

    //TODO: Should this take source classes like this, or should it take json objects? probably both?
    addSource(id:string, source:VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource):this;

    removeSource(id:string):this;

    getSource(id:string):VectorSource | RasterSource | GeoJSONSource | ImageSource | VideoSource;

    addLayer(layer:Layer, before?:string):this;

    removeLayer(id:string):this;

    getLayer(id:string):Layer;

    setFilter(layer:string, filter:Array<any>):this

    setLayerZoomRange(layerId:string, minzoom:number, maxzoom:number):this;

    getFilter(layer:string):Array<any>;

    setPaintProperty(layer:string, name:string, value:any, klass?:string):this;

    getPaintProperty(layer:string, name:string, klass?:string):any;

    setLayoutProperty(layer:string, name:string, value:any):this;

    getLayoutProperty(layer:string, name:string, klass?:string):any;

    getContainer():HTMLElement;

    getCanvasContainer():HTMLElement;

    getCanvas():HTMLElement;

    loaded():boolean;

    remove():undefined;

    getCenter():LngLat;

    setCenter(center:LngLat, eventData?:EventData):this;

    panBy(offset:Array<number>, options?:AnimationOptions, eventData?:EventData):this;

    panTo(lnglat:LngLat, options?:AnimationOptions, eventData?:EventData):this;

    getZoom():number;

    setZoom(zoom:number, eventData?:EventData):this;

    zoomTo(zoom:number, options?:AnimationOptions, eventData?:EventData):this;

    zoomIn(options?:AnimationOptions, eventData?:EventData):this;

    zoomOut(options?:AnimationOptions, eventData?:EventData):this;

    getBearing():number;

    setBearing(bearing:number, eventData?:EventData):this;

    rotateTo(bearing:number, options?:AnimationOptions, eventData?:EventData):this;

    resetNorth(options?:AnimationOptions, eventData?:EventData):this;

    snapToNorth(options?:AnimationOptions, eventData?:EventData):this;

    getPitch():number;

    setPitch(pitch:number, eventData?:EventData):this;

    fitBounds(bounds:LngLatBounds|Array<Array<number>>, options:{linear?:boolean,easing?:Function,padding?:number,maxZoom?:number}, eventData?:EventData):this;

    jumpTo(options:CameraOptions, eventData?:EventData):this;

    easeTo(options:CameraAndAnimationOptions, eventData?:EventData):this;

    flyTo(options:CameraAndAnimationOptions, eventData?:EventData):this;

    stop():this;
  }

  /** TODO: Should be a class */
  interface VectorSource extends Source {
    type:"vector";
    url:string;
  }

  /** TODO: Should be a class */
  interface RasterSource extends Source {
    type:"raster";
    url:string;
    tileSize:number
  }

  class GeoJSONSource implements Source {
    type:"geojson";

    constructor(options:{ data:GeoJSON.GeoJsonObject });

    setData(data:string | GeoJSON.GeoJsonObject):void;
  }

  /** TODO: Should be a class */
  interface ImageSource extends Source {
    type:"image";
    url:string;

    /** [longitude, latitude] pairs for the image corners listed in clockwise order: top left, top right, bottom right, bottom left. */
    coordinates:Array<Array<number>>
  }

  interface VideoSource extends Source {
    type:"video";

    urls:Array<string>;

    /** [longitude, latitude] pairs for the video corners listed in clockwise order: top left, top right, bottom right, bottom left. */
    coordinates:Array<Array<number>>
  }


  interface Layer {
    id:string;
    type?:"fill" | "line" | "symbol" | "circle" | "raster" | "background";

    //metadata
    ref?:string;

    /** Docs say this is optional but errors say it isn't */
    source:string;

    "source-layer"?:string;

    minzoom?:number;
    maxzoom?:number;

    interactive?:boolean;

    filter?:Array<any>;
    layout?:BackgroundLayout | FillLayout | LineLayout | SymbolLayout | RasterLayout | CircleLayout;
    paint?:BackgroundPaint | FillPaint | LinePaint | SymbolPaint | RasterPaint | CirclePaint; //TODO: Other types
    //paint.*
  }

  interface StyleFunction {
    stops:Array<Array<any>>;
    property?:string;
    base?:number;
    type?:"continuous" | "interval" | "categorical";
  }

  interface BackgroundLayout {
    visibility?:"visible" | "none";
  }

  interface BackgroundPaint {
    "background-color":string;
    "background-pattern":string;
    "background-opacity":number;
  }

  interface FillLayout {
    visibility?:"visible" | "none";
  }
  interface FillPaint {
    "fill-antialias"?:boolean;
    "fill-opacity"?:number;
    "fill-color"?:string;
    "fill-outline-color":string;
    "fill-translate"?:Array<number>;
    "fill-translate-anchor"?:"map" | "viewport";
    "fill-pattern"?:"string";
  }

  interface LineLayout {
    visibility?:"visible" | "none";

    "line-cap"?:"butt" | "round" | "square";
    "line-join"?:"bevel" | "round" | "miter";
    "line-miter-limit"?:number;
    "line-round-limit"?:number;
  }
  interface LinePaint {
    "line-opacity"?:number;
    "line-color"?:string;
    "line-translate"?:Array<number>;
    "line-translate-anchor"?:"map" | "viewport";
    "line-width"?:number;
    "line-gap-width"?:number;
    "line-offset"?:number;
    "line-blur"?:number;
    "line-dasharray"?:Array<number>;
    "line-pattern"?:string;
  }

  interface SymbolLayout {
    visibility?:"visible" | "none";

    "symbol-placement"?:"point" | "line";
    "symbol-spacing"?:number;
    "symbol-avoid-edges"?:boolean;
    "icon-allow-overlap"?:boolean;
    "icon-ignore-placement"?:boolean;
    "icon-optional"?:boolean;
    "icon-rotation-alignment"?:"map" | "viewport";
    "icon-size"?:number;
    "icon-image"?:string;
    "icon-rotate"?:number;
    "icon-padding"?:number;
    "icon-keep-upright"?:boolean;
    "icon-offset"?:Array<number>;
    "text-rotation-alignment"?:"map" | "viewport";
    "text-field"?:string;
    "text-font"?:string;
    "text-size"?:number;
    "text-max-width"?:number;
    "text-line-height"?:number;
    "text-letter-spacing"?:number;
    "text-justify"?:"left" | "center" | "right";
    "text-anchor"?:"center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
    "text-max-angle"?:number;
    "text-rotate"?:number;
    "text-padding"?:number;
    "text-keep-upright"?:boolean;
    "text-transform"?:"none" | "uppercase" | "lowercase";
    "text-offset"?:Array<number>;
    "text-allow-overlap"?:boolean;
    "text-ignore-placement"?:boolean;
    "text-optional"?:boolean;

  }
  interface SymbolPaint {
    "icon-opacity"?:number;
    "icon-color"?:string;
    "icon-halo-color"?:string;
    "icon-halo-width"?:number;
    "icon-halo-blur"?:number;
    "icon-translate"?:Array<number>;
    "icon-translate-anchor"?:"map" | "viewport";
    "text-opacity"?:number;
    "text-color"?:"string";
    "text-halo-color"?:"string";
    "text-halo-width"?:number;
    "text-halo-blur"?:number;
    "text-translate"?:Array<number>;
    "text-translate-anchor"?:"map" | "viewport";
  }

  interface RasterLayout {
    visibility?:"visible" | "none";
  }

  interface RasterPaint {
    "raster-opacity"?:number;
    "raster-hue-rotate"?:number;
    "raster-brightness-min"?:number;
    "raster-brightness-max"?:number;
    "raster-saturation"?:number;
    "raster-contrast"?:number;
    "raster-fade-duration"?:number;
  }

  interface CircleLayout {
    visibility?:"visible" | "none";
  }

  interface CirclePaint {
    "circle-radius"?:number|StyleFunction;
    "circle-color"?:number|StyleFunction;
    "circle-blur"?:number;
    "circle-opacity"?:number;
    "circle-translate"?:Array<number>;
    "circle-translate-anchor"?:"map" | "viewport";
  }

  class Popup {
    constructor(options:{
      closeButton?:boolean,
      closeOnClick?:boolean,
      anchor?:'top'|'bottom'|'left'|'right'|'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    });

    addTo(map:Map):this;

    remove():this;

    getLngLat():LngLat;

    setLngLat(lnglat:LngLat):this;

    setText(test:string):this;

    setHtml(html:string):this;

    setDomContent(htmlNode:Node):this;
  }

  abstract class Control {
    addTo(map:Map):this;

    remove():this;
  }

  class Navigation extends Control {
    constructor(options:{
      position:'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    });
  }

  class Geolocate extends Control {
    constructor(options:{
      position:'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    });
  }

  class Attribution extends Control {
    constructor(options:{
      position:'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    });
  }

  interface EventData {
    originalEvent?:Event;
    point?:Array<number>;
    lngLat?:LngLat;
  }

  interface CameraOptions {
    /** Map center */
    center?:LngLat;
    /** Map zoom level */
    zoom?:number;
    /** Map rotation bearing in degrees counter-clockwise from north */
    bearing?:number;
    /** Map angle in degrees at which the camera is looking at the ground */
    pitch?:number;
    /** If zooming, the zoom center (defaults to map center) */
    around?:LngLat;
  }

  interface AnimationOptions {
    /** Number in milliseconds */
    duration?:number;
    easing?:Function;
    /** point, origin of movement relative to map center */
    offset?:Array<number>;
    /** When set to false, no animation happens */
    animate?:boolean;
  }

  interface StyleOptions {
    transition?:boolean;
  }

  interface CameraAndAnimationOptions extends CameraOptions, AnimationOptions {
  }
}

export = mapboxgl;
