
# Northcoders News Backend

Welcome to my Northcoders News API! This is my Crud API I made for my NC-news front end. The API has endpoint fetching data for articles, comments, topics and users. If a incorrect input is passed,you will receive an error meassge telling you how to fix this issue.

This application was made for me to get to grips with everything I learnt while on the back-end side of the course at Northcoders.


For developers, Clone the source locally: https://github.com/danny087/BE2-northcoders-news.git

Download & Setup To download this project, take the following steps:

Fork the project to your own github profile.

Open your terminal.

Then navigate to where you would like to download the project.

Clone the repo, by typing "git clone" and then the URL of your repo (you can find this by clicking the green 'Clone or Download' button) now install the project dependencies by typing npm install into you terminal.

Ensure that Mongo is running in the background by typing mongod in a terminal window.

In a second terminal window, run npm run seed:dev to seed the database.

Then, run node listen.js to start the web server.

# Running tests

Open the spec folder

open spec.js

place a .only in front of any endpoint you would like to test.

Run npm test in your terminal.

The data that comes back is from a mock mongo database which resembles the real database i'm using for my frontend northcoders news, the only difference is the size of the database.




