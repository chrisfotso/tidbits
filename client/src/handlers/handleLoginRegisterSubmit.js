async function handleSubmit(url, obj, e) {
  console.log(obj);
  e.preventDefault();

  //$this is bound in whichever component is calling handleSubmit()
  const { username, password, password2 } = obj;

  if (password2 && password !== password2) {
    return { err: "Passwords do not match" };
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
