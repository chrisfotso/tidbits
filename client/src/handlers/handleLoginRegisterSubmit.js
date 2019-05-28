async function handleSubmit(url, e) {
  e.preventDefault();

  //$this is bound in whichever component is calling handleSubmit()
  const { username, password, password2 } = this.state;

  if (password2 && password !== password2) {
    alert(`Passwords do not match`);
    return false;
  }

  const reqBody = {
    username,
    password
  };

  const fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  };

  const response = await fetch(url, fetchOptions);
  const data = await response.json();
  console.log(data);
  return data;
}

export default handleSubmit;
