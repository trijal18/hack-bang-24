import {searchGemi as searchGemi,searchRand as searchRand,search as search } from "./search.js";

(async () => {
    try {
        const result = await search("cake", 20000);
        console.log(result);
    } catch (error) {
        console.error("Error occurred:", error);
    }
})();
