import React from 'react';

type Props = {
  addNote: (value: string, isAnonymous: boolean, rate: number) => void;
} & typeof defaultProps;

const defaultProps = {
  addNote: (value: string, isAnonymous: boolean, rate: number) => {},
};

class WriteNote extends React.Component<Props> {
  state = {
    visible: false,
    value: '',
    isAnonymous: false,
    rate: 0,
  };

  toggleAnonymous = () => this.setState({ isAnonymous: !this.state.isAnonymous });

  extendArea = () => this.setState({ visible: !this.state.visible });

  handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ value: e.target.value });

  postNote = () => {
    const { value, isAnonymous, rate } = this.state;
    //   trim() removes all whitespaces and checks if string is not empty
    if (Boolean(value.trim())) {
      this.props.addNote(value, isAnonymous, rate);
      this.setState({ value: '' });
    }

    this.setState({ isAnonymous: false });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        {!visible ? (
          <button className="note button is-small is-fullwidth" onClick={() => this.extendArea()}>
            <i className="fas fa-plus"></i> <span className="span-write-note">Write Note </span>
          </button>
        ) : null}
        {visible ? (
          <>
            <textarea
              className="textarea"
              rows={3}
              value={this.state.value}
              onChange={(e) => this.handleChange(e)}
            ></textarea>
            <div className="write-note-footer">
              <label className="checkbox">
                <input type="checkbox" onClick={() => this.toggleAnonymous()} />
                Post anonymously
              </label>
              <button
                className="button is-small is-link is-pulled-right"
                onClick={() => {
                  this.extendArea();
                  this.postNote();
                }}
              >
                Add Note
              </button>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

// WriteNote.defaultProps = defaultProps;

export default WriteNote;
