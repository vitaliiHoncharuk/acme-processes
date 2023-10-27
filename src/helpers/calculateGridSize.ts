export const calculateGridSize = () => {
  const container = document.querySelector('.canvas-container');
  if (container) {
    const containerWidth = container.clientWidth;

    return containerWidth / 10;
  }

  return 100;
};
