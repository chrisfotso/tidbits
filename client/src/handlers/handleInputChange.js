function handleInputChange(e) {
  const { name: inputName } = e.target;
  this.setState({
    [inputName]: e.target.value
  });
}

export default handleInputChange;
