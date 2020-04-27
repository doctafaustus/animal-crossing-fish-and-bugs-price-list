const data = require('./data');
const fs = require('fs');
const mainArray = [];
const userSaysArray = [];


data.forEach((item, i) => {
  const mainIntentTemplate = {
    "id": "",
    "name": "",
    "auto": true,
    "contexts": [],
    "responses": [
      {
        "resetContexts": false,
        "affectedContexts": [],
        "parameters": [],
        "messages": [
          {
            "type": 0,
            "lang": "en",
            "condition": "",
            "speech": ""
          }
        ],
        "defaultResponsePlatforms": {},
        "speech": []
      }
    ],
    "priority": 500000,
    "webhookUsed": false,
    "webhookForSlotFilling": false,
    "fallbackIntent": false,
    "events": [],
    "conditionalResponses": [],
    "condition": "",
    "conditionalFollowupEvents": []
  };

  const userSaysTemplate = [
    {
      "id": "",
      "data": [
        {
          "text": "",
          "userDefined": false
        }
      ],
      "isTemplate": false,
      "count": 0,
      "updated": 0
    }
  ];


  const article = /a|e|i|o/.test(item.name.toLocaleLowerCase().charAt(0)) ? 'an' : 'a';
  mainIntentTemplate.id = i.toString();
  mainIntentTemplate.name = `How much is ${article} ${item.name} worth?`;
  mainIntentTemplate.responses[0].messages[0].speech = `${article} ${item.name} is worth ${item.price} bells.`;

  userSaysTemplate[0].id = (i + 1000).toString();
  userSaysTemplate[0].data[0].text = `How much is ${article} ${item.name} worth?`;

  mainArray.push(mainIntentTemplate);
  userSaysArray.push(userSaysTemplate);
});


mainArray.forEach(obj => {
  fs.writeFile(`./generated-intents/${obj.name.replace('?', '_')}.json`, JSON.stringify(obj), (err) => {
    if (err) return console.log(err);
    console.log('The main file was saved');
  });   
});

userSaysArray.forEach(obj => {
  fs.writeFile(`./generated-intents/${obj[0].data[0].text.replace('?', '__usersays_en')}.json`, JSON.stringify(obj), (err) => {
    if (err) return console.log(err);
    console.log('The user file was saved');
  });
});
