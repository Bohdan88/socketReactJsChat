import React from 'react';

type Props = {
  id: number;
  title: string;
  titleBackground: string;
  notesCount: number;
} & typeof defaultProps;

const defaultProps = {
  id: 0,
  title: 'Default Tilte',
  titleBackground: 'has-background-white',
  notesCount: 0,
};

const ColumnHeader: React.FunctionComponent<Props> = (props) => (
  <p className={`title is-4 column-title`}>
    {props.title}
    <span className="tag is-black is-pulled-right">{props.notesCount}</span>
  </p>
);

ColumnHeader.defaultProps = defaultProps;

export default ColumnHeader;
