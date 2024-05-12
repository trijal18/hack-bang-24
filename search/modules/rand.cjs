function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getJson(prompt, budget) {
    let text = `{"key":[
    { "role":"Frontend Developer" , "pay":${budget*20/100} , "number":${rand(1, 2)} }, 
    { "role":"Backend Developer" , "pay":${budget*30/100}  , "number":${rand(1, 2)} }, 
    { "role": "MobileApp" , "pay":${budget*30/100}  , "number":${rand(1, 2)} },
    { "role": "DevOps" , "pay":${budget*10/100}  , "number":${rand(1, 2)} }, 
    { "role": "UI/UX" , "pay": ${budget*10/100}  , "number":${rand(1, 2)} }]}`;
    //console.log(text);
    return JSON.parse(text);
}

//console.log(getJson("website development", 100000).key[0].role);

module.exports = {
    rand,
    getJson,
  };
