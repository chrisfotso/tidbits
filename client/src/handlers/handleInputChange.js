function handleInputChange(func, e) {
  //Dynamically setting state by getting the name attribute of event.target
  const { name: inputName } = e.target;

  func(e.target.value);
}

export default handleInputChange;
