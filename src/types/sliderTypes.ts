export interface SliderI<T extends number | string> {
  arr: T[];
  visibleSlidesAmount: number;
  width: number; //%
  direction: "horizontal" | "vertical";
  isCircular: boolean;
  delay: number;
}

export interface ElementI<T extends number | string> {
  id: number;
  value: T;
}
