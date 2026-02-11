export const getPopoverPosition = (popover: {
  x: number;
  y: number;
}): { top: number; left: number } => {
  if (typeof window === "undefined") {
    return { top: 0, left: 0 }; // Default values during server rendering
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const diagonalMid = (screenWidth + screenHeight) / 2;
  const antiDiagonalMid = (screenHeight - screenWidth) / 2;

  let top = popover.y;
  let left = popover.x;

  // **Quadrant 1:** (x + y > diagonalMid) && (y - x < antiDiagonalMid)
  if (
    popover.x + popover.y > diagonalMid &&
    popover.y - popover.x < antiDiagonalMid
  ) {
    left = popover.x - 210; // Move left
  }

  // **Quadrant 2:** (x + y > diagonalMid) && (y - x >= antiDiagonalMid)
  if (
    popover.x + popover.y > diagonalMid &&
    popover.y - popover.x >= antiDiagonalMid
  ) {
    top = popover.y - 200; // Move up
    left = popover.x - 210;
  }

  // **Quadrant 3:** (x + y <= diagonalMid) && (y - x >= antiDiagonalMid)
  if (
    popover.x + popover.y <= diagonalMid &&
    popover.y - popover.x >= antiDiagonalMid
  ) {
    top = popover.y - 200; // Move up slightly
  } else {
    left = popover.x - 100;
    top = popover.y - 200;
  }

  return { top, left };
};
