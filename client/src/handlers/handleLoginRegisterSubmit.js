async function handleSubmit(url, e) {
  e.preventDefault();

  const reqBody = {
    username: this.state.username,
    password: this.state.password
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
