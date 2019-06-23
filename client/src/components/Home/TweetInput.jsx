import React, { useState } from "react";

const TweetInput = props => {
  const [tweetText, setTweetText] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(140);

  const { jwtAuthToken, setIsLoading, url } = props;

  const handleChange = e => {
    const { value } = e.target;
    const { length } = value; //The length of the text in the textarea

    if (140 - length < 0) {
      setCharsRemaining(0); //Ensuring the character counter doesn't go below zero
      //Not calling setTweetText() because I don't want the user to be able to type more than 140 chars
    } else {
      setCharsRemaining(140 - length);
      setTweetText(value);
    }
  };

  const handleSendTweet = async () => {
    setIsLoading(true);

    const reqBody = { text: tweetText };

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtAuthToken}`, //Putting JWT token in bearer authorization header for verification purposes
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reqBody)
    };

    const data = await fetch(url, fetchOptions);

    setTweetText("");
    setCharsRemaining(140);
    //Not calling setIsLoading(false) because that happens in the effect of the Tweets component
    //isLoading is a dependency of the effect in the Tweets component
    //Since I called setIsLoading(true) at the beginning of this function, the effect in Tweets will fire and eventually call setIsLoading(false);
  };

  return (
    <div className="tweet-input">
      <textarea
        type="text"
        onChange={handleChange}
        value={tweetText}
        name="tweet-input"
        placeholder="Share a tidbit!"
        id=""
        className="tweet-input__input"
      />
      <p className="tweet-input__chars">{charsRemaining}</p>
      <button onClick={handleSendTweet}>Share</button>
    </div>
  );
};

export default TweetInput;
