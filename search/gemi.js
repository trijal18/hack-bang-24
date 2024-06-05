import dotenv from "dotenv";
import {GoogleGenerativeAI} from "@google/generative-ai";

dotenv.config();

const API_KEY = process.env.API_KEY;

//const genAI = new GoogleGenerativeAI(API_KEY);
const genAI = new GoogleGenerativeAI("");

async function getAns(prompt,budget){
    const model = genAI.getGenerativeModel({model:"gemini-pro"});
    const prompt_ai=`i want to build an ${prompt} suggest required frontend,backend,devops,mobile app dev,uiux dev with there respective budget from total budget of ${budget} send the data in following format:
    {"key":[
        { "role":"Frontend Developer" , "pay": , "number":] }, 
        { "role":"Backend Developer" , "pay":  , "number": }, 
        { "role": "MobileApp" , "pay":  , "number": },
        { "role": "DevOps" , "pay":  , "number": }, 
        { "role": "UI/UX" , "pay": , "number": }]} and FORMAT THE DATA EXACTLY LIKE EXAMPLE`;
    const result= await model.generateContent(prompt_ai);
    const response= await result.response;
    const text=response.text();
    const result2= await model.generateContent(`take this json ${text} and format it like this properly
    {"key":[
        { "role":"Frontend Developer" , "pay": , "number":] }, 
        { "role":"Backend Developer" , "pay":  , "number": }, 
        { "role": "MobileApp" , "pay":  , "number": },
        { "role": "DevOps" , "pay":  , "number": }, 
        { "role": "UI/UX" , "pay": , "number": }]}`);
    const response2=await result2.response;
    const text2=response2.text();
    //console.log(text);
    //console.log(typeof(text));
    return JSON.parse(text2.replace(/`/g,'"'));
}

/*(async () => {
    try {
        const result = await getAns("cake", 20000);
        console.log(result);
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();*/

export{
    getAns,
}
