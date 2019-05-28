function handleInputChange(e) {
  //Dynamically setting state by getting the name attribute of event.target
  const { name: inputName } = e.target;

  this.setState({
    [inputName]: e.target.value
  });
}

export default handleInputChange;
