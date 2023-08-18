# GraphQL Real-time Chat/Messaging 
### Technologies Used
<p>
<img src="https://img.shields.io/badge/-GraphQL%20-black?style=for-the-badge&logo=graphql&logoColor=blueviolet">
<img src="https://img.shields.io/badge/-Expressjs%20-%23323330?style=for-the-badge&logo=express">
<img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react" >   
<img src="https://img.shields.io/badge/-Nodejs%20-%23323330?style=for-the-badge&logo=Node.js&logoColor=green">
<img src="https://img.shields.io/badge/-Apollo%20GraphQL-311C87?logo=apollo%20graphql&logoColor=white&style=for-the-badge">
</p>

## Branch main:

Full credit goes to:

Vicoria Lo

This is a real-time chat app created for the [GraphQL for Beginners](https://lo-victoria.com/series/graphql) series on her blog.





### Demo
![demo](https://cdn.hashnode.com/res/hashnode/image/upload/v1617185843961/_c4WXjooW.gif)

### Getting Started
1. Clone this repo
2. `npm install` on both `client` and `server` folders
3. `npm start`


## Branch with-channels

GraphQL real-time messaging with channels. Uses polling to make the messages appear instantly.

````
npm i
npm run dev
``````

## Branch subscriptions - IP

GraphQL real-time messaging with channels, now using subscriptions over websocket instead of polling. Example of using split from @apollo/client to use websocket link with http link. 

````
npm i
npm run dev
``````

Server side is working and can be tested in Apollo sandbox. Client side is still IP. 
