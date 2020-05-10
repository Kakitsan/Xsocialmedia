"use strict";
// template for firebase basic chatroom
// YOU WILL NEED TO PASTE YOUR CONFIG INFO FROM FIREBASE LINE 31

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let messageInput;
let usernameInput;
let sendBtn;
let chatsLoaded = false;
let Mashita;
let messageDiv;

function preload(){
  Mashita = loadFont('assets/Mashita.ttf');

}

function setup() {
  createCanvas(2000, 900);
  // createCanvas(600, 600);
  messageDiv = document.querySelector('#messageDiv');
  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  usernameInput = select('#usernameInput');
  messageInput = select('#messageInput');
  sendBtn = select('#sendBtn');


  messageInput.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);

  // PASTE YOUR FIREBASE CONFIG DATA HERE
  let config = {
    apiKey: "AIzaSyCe3Wvf80L38tMAshrY5UPo21GiAAKf2YI",
    authDomain: "messageinbox-3c878.firebaseapp.com",
    databaseURL: "https://messageinbox-3c878.firebaseio.com",
    projectId: "messageinbox-3c878",
    storageBucket: "messageinbox-3c878.appspot.com",
    messagingSenderId: "517264911668",
    appId: "1:517264911668:web:2ee40a7408cea187610961"
  };

  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);
}

function draw() {

}

function sendMessage() {
  let timestamp = Date.now();
  let chatObject = {
    username: usernameInput.value(),
    message: messageInput.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chatObject);
  // messageInput.value('');
  // popUp();
}

function displayPastChats() {
  let length = fbDataArray.length;
  for (let i = 0; i < length; i++) {
    let date = new Date(fbDataArray[i].timestamp);
    let p = createP(`${date.toString()} ${fbDataArray[i].username}: ${fbDataArray[i].message}`);
    p.parent('messageDiv');

  }
  for (let i = 0; i < length; i++) {
    let date = new Date(fbDataArray[i].timestamp);
    let p = createP(`${fbDataArray[i].username}: ${fbDataArray[i].message}`);
    p.position(random(0, 1800), random(0, 800));
    p.style('background-color', `hsl(${(length * random(1, 9)) % 300}, 80%, 50%)`);

  }

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let date = new Date(fbDataArray[index].timestamp);
  let p = createP(`${date.toString()} ${fbDataArray[index].username}: ${fbDataArray[index].message}`);
  p.parent('messageDiv');

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;
  let d = createP(`${fbDataArray[index].username}: ${fbDataArray[index].message}`);
  d.position(random(0, 1800), random(0, 800));
  d.style('background-color', `hsl(${(index * random(1, 9)) % 300}, 80%, 50%)`);


}

// function popUp(){
//   let length = fbDataArray.length;
//   // textFont(Mashita);
//   // textSize(random(25,80));
//   // text.style();
//   // text(fbDataArray[index].message, random(0, 2000), random(0, 2000));
//   for (let i = 0; i < length; i++) {
//     let date = new Date(fbDataArray[i].timestamp);
//     let p = createP(`${fbDataArray[i].username}: ${fbDataArray[i].message}`);
//     p.position(random(0, 1800), random(0, 800));
//     p.style('background-color', `hsl(${(length * random(1, 9)) % 300}, 80%, 50%)`);
//
//   }
//
// }
