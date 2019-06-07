async function handleSubmit(url, obj, e) {
  e.preventDefault();

  //$this is bound in whichever component is calling handleSubmit()
  const { username, password, password2 } = obj;

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

  return data;
}

export default handleSubmit;
