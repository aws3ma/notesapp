import React from "react";
import Draggable from "react-draggable";
class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      msg : '',
      drag : true,
    };
  }
  componentWillMount = () => {
    this.style = {
      right: this.randomBetween(0, window.innerWidth - 150, "px"),
      top: this.randomBetween(0, window.innerHeight - 150, "px"),
    };
  };
  randomBetween = (x, y, s) => {
    return x + Math.ceil(Math.random() * (y - x)) + s;
  };
  editin = () => {
    this.setState({ editing: true,drag:false });
  };
  save = () => {
    this.props.onChange(this.state.msg, this.props.id);
    this.setState({ editing: false ,drag:true});
    console.log(this.state.editing);
  };
  deletin = () => {
    this.props.onRemove(this.props.id);
  };
  renderDisplay = () => {
    return (
      <div className="note" style={this.style}>
        <p onMouseEnter={this.mouseEnterHandler} onMouseLeave={this.mouseLeaveHandler}> {this.props.children} </p>
        <span>
          <button onClick={this.editin}>Edit</button>
          <button onClick={this.deletin}>X</button>
        </span>
      </div>
    );
  };
  handleChange = event =>{
    this.setState({msg:event.target.value})
  }
  mouseLeaveHandler = event =>{
    this.setState({drag:true})
  }
  mouseEnterHandler = event => {
    this.setState({drag:false})

  }
  renderUpdate = () => {
    return (
      <div className="note" style={this.style}>
        <textarea  value={this.state.msg} onChange={this.handleChange} onMouseLeave={this.mouseLeaveHandler} onMouseEnter={this.mouseEnterHandler}></textarea>
        <button onClick={this.save}>save</button>
      </div>
    );
  };
  render() {
      if(this.state.editing === true){
        return (
          <Draggable disabled={!this.state.drag} bounds='parent'>{this.renderUpdate()}</Draggable>
          )
      }else{
        return (
          <Draggable disabled={!this.state.drag} bounds='parent'>{this.renderDisplay()}</Draggable>

          
          )
      }
  }
}
export default Note;
