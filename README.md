# FlashLingo
Differences between the demo and the actual app:
- The server has been completely stripped
- There is no need to login
- There is no database; all cards are valid only for the active session

View the demo: https://vpoliakov.github.io/FlashLingo/ (optimized for Chrome)

## What does it do?
- Requires the user to login using Google authentication
![image](https://user-images.githubusercontent.com/10080683/59396082-ecfb7480-8d3b-11e9-82a6-732663dbbba5.png)
  - If the user has logged in during the last 6 hours, uses cookies to authenticate the user
  - Does not store any data about the user except the user's Google id (salted and hashed using SHA-256)
- Allows the user to:
![image](https://user-images.githubusercontent.com/10080683/59396328-1f59a180-8d3d-11e9-8f53-96092e3fdf4f.png)
  - Create flash cards for Swedish (eftersom svenska är fantastik) words and phrases (input by the user)
    - Translation is done using the Google Translation API
  - Review and answer the cards
  ![image](https://user-images.githubusercontent.com/10080683/59396451-ae66b980-8d3d-11e9-8120-0162d9be35ec.png)
    - Cards are picked randomly with probabilities depending on the correct / incorrect answer ratio
    - On a correct answer, a "Correct!" message pops up
    ![image](https://user-images.githubusercontent.com/10080683/59396426-92fbae80-8d3d-11e9-94d5-ee0510e45556.png)
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
