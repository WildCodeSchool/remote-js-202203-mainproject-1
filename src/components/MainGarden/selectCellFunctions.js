export const boxLeft = (id) => { return id - 1; };
export const boxRight = (id) => { return id + 1; };
export const boxPreviousColumnLeft = (id,columns) => { return id - (columns + 1); };
export const boxPreviousColumn = (id,columns) => { return id - columns; };
export const boxPreviousColumnRight = (id,columns) => { return id - (columns - 1); };
export const boxNextColumnLeft = (id,columns) => { return id + (columns - 1); };
export const boxNextColumn = (id,columns) => { return id + columns; };
export const boxNextColumnRight = (id,columns) => { return id + columns + 1; };