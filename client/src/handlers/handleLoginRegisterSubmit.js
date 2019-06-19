//Parameter 'url' is the URL you want to post to: either /user/login or /user/register
//Parameter 'infoObj' is an object that contains information you want to put in the body of the request; username, password
//Parameter 'errorHandlerFunc' is a function meant to update the state of its respective component if there are any errors so the errors can be displayed to the user
async function handleSubmit(url, infoObj, errorHandlerFunc, event) {
  event.preventDefault();

  const { username, password, password2 } = infoObj;

  if (password2 && password !== password2) {
    return errorHandlerFunc("Passwords do not match");
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

  if (data.err) {
    errorHandlerFunc(data.err);
  } else return data;
}

export default handleSubmit;
