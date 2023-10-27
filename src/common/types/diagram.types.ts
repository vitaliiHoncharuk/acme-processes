// react-diagrams doesn't have a type for this
export interface DiagramSerializeType {
  offsetX: number;
  offsetY: number;
  zoom: number;
  gridSize: number;
  layers: {
    isSvg: boolean;
    transformed: boolean;
    models: {
      [x: string]: {
        type: string;
        selected: boolean;
        extras: any;
        id: string;
        locked: boolean;
      };
    };
    type: string;
    selected: boolean;
    extras: any;
    id: string;
    locked: boolean;
  }[];
  id: string;
  locked: boolean;
}
