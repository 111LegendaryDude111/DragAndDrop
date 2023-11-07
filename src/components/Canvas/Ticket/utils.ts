export const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
  const target = e.currentTarget;
  target.style.boxShadow = `none`;
  target.style.transform = ` translate(${e.pageX - target.offsetLeft}px,${
    e.pageY - target.offsetTop
  }px)`;
};

export const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
  const target = e.currentTarget;
  target.style.boxShadow = `0px 0px 15px 5px red`;
};
