import React from 'react';
import { ItemTypes } from '../constants';
import { useDrop } from 'react-dnd';

type Props = {
  children: React.ReactNode;
  id: number;
};

const Column: React.FunctionComponent<Props> = (props) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.Note,
    canDrop: () => true,
    drop: () => props,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });
  return (
    <div className="column" ref={drop}>
      <div className={!isOver && !canDrop ? 'column-wrap' : 'column-wrap drop'}>{props.children}</div>
    </div>
  );
};

export default Column;
