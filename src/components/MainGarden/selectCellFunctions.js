import { columns } from "./MainVegetableGarden";

export const boxLeft = (id) => { return id - 1; };
export const boxRight = (id) => { return id + 1; };
export const boxPreviousColumnLeft = (id) => { return id - (columns + 1); };
export const boxPreviousColumn = (id) => { return id - columns; };
export const boxPreviousColumnRight = (id) => { return id - (columns - 1); };
export const boxNextColumnLeft = (id) => { return id + (columns - 1); };
export const boxNextColumn = (id) => { return id + columns; };
export const boxNextColumnRight = (id) => { return id + columns + 1; };