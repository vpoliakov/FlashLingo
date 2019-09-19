# FlashLingo

## What does it do?
- Requires the user to login using Google authentication
![image](https://user-images.githubusercontent.com/10080683/59396082-ecfb7480-8d3b-11e9-82a6-732663dbbba5.png)
  - If the user has logged in during the last 6 hours, uses cookies to authenticate the user
  - Does not store any data about the user except the user's Google id (salted and hashed using SHA-256)
- Allows the user to:
![image](https://user-images.githubusercontent.com/10080683/59398605-b32f6b80-8d45-11e9-8383-e2e370b3fb9e.png)
  - Create flash cards for Swedish (eftersom svenska är fantastik) words and phrases (input by the user)
    - Translation is done using the Google Translation API
  - Review and answer the cards
  ![image](https://user-images.githubusercontent.com/10080683/59398650-cf330d00-8d45-11e9-9f57-eefadb624af0.png)
    - Cards are picked randomly with probabilities depending on the correct / incorrect answer ratio
    - On a correct answer, a "Correct!" message pops up
    ![image](https://user-images.githubusercontent.com/10080683/59398669-e07c1980-8d45-11e9-89e7-85bde371cc27.png)
    - On an incorrect answer, the card flips and displays the correct answer
- Stores the cards in a SQLite database
- Works in all resolutions

![image](https://user-images.githubusercontent.com/10080683/59396688-c1c65480-8d3e-11e9-8dc0-9afaf8a52740.png)

## Technologies used
- React with jsx
- JavaScript
- Node.js
- SQLite
- Google Sign-in https://developers.google.com/identity/
- Google Translate API https://cloud.google.com/translate/docs/
- Express server https://expressjs.com/
- npm passport https://www.npmjs.com/package/passport
- npm cookie-session https://www.npmjs.com/package/cookie-session
- Node.js built-in crypto module

## Files worth looking at
- server.js 
- db.js
- auth/flashlingo.jsx
