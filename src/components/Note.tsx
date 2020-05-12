import React from 'react';
import { ItemTypes, DEFAULT_USER_COLOR } from '../constants';
import { useDrag } from 'react-dnd';

type Props = {
  key: number;
  noteId: number;
  columnId: number;
  text: string;
  userName: string;
  moveNote: (noteId: number, destColumnId: number, currentColumnId: number) => void;
  deleteNote: (noteId: number, columnId: number) => void;
  updateNote: (noteId: number, columnId: number) => void;
  removeStatus: boolean;
  isFun: boolean;
  rate: number;
  userColor: string;
} & typeof defaultProps;

const defaultProps = {
  key: 0,
  noteId: 0,
  columnId: 0,
  rate: 0,
  text: '',
  userName: '',
  userColor: '',
  removeStatus: false,
  isFun: false,
};

const Note: React.FunctionComponent<Props> = (props) => {
  const { noteId, columnId, text, moveNote, deleteNote, updateNote, removeStatus, rate, isFun, userColor } = props;
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.Note, noteId, columnId, text },
    end: (item, monitor) => monitor.getDropResult() && moveNote(noteId, monitor.getDropResult().id, columnId), // if monitor.getDropResult() not null
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return props ? (
    <div
      className="box notification is-themed-box"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {removeStatus && <button className="delete delete-button" onClick={() => deleteNote(noteId, columnId)}></button>}
      <article className="media">
        <div className="media-content">
          <div className="content">
            <p className="content-text">{props.text}</p>
          </div>
          <nav className="level is-mobile">
            <span>
              <span
                style={{ backgroundColor: `#${userColor || DEFAULT_USER_COLOR}` }}
                className="label-round  is-inline-block is-size-7"
              >
                {props.userName[0].toUpperCase()}
              </span>
              <span className="note-author capitalize"> {props.userName} </span>
            </span>
            <div className="level-left">
              <span
                className={`icon is-small rate-status ${isFun ? 'has-text-danger' : ''}`}
                onClick={() => updateNote(noteId, columnId)}
              >
                {/* <i className="fas fa-thumbs-up" aria-hidden="true"></i> */}
                <i className="fas fa-heart" aria-hidden="true"></i>
                <span className="rate-number"> {rate}</span>
              </span>
            </div>
          </nav>
        </div>
      </article>
    </div>
  ) : null;
};

Note.defaultProps = defaultProps;

export default Note;
