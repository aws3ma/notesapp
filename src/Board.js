import React from 'react';
import './App.css';
import Note from './Note';
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [
      ],
    };
  }
  
  nextID = () =>{
    this.id = this.id || 0;
    return this.id++;
  }
  add = (text) =>{
    var notes = [
      ...this.state.notes,
      {
        id:this.nextID(),
        msg:text
      }
    ]
    this.setState({notes})
  }
  update = (newText, id) => {
    var notes = this.state.notes.map((note) =>
      note.id !== id ? note : { ...note, msg: newText }
    );
    this.setState({ notes });
  };
  remove = (id) => {
    var notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  };
  eachNote = (note) => {
    return (
      <Note
        key={note.id}
        id={note.id}
        onChange={this.update}
        onRemove={this.remove}
      >
        {note.msg}
      </Note>
    );
  };
  render() {
    return (
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button className='add' onClick={()=>this.add()}>+</button>
        <button id='deleteAll' className='remove'>X</button>
      </div>
    );
  }
}

export default Board;
