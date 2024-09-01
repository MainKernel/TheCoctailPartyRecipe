import axios from "axios";
import express from "express";

const port = 3000;
const app = express();
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        var result = await axios.get(API_URL);
        var ingridientsList = getIngridientsList(result.data.drinks[0]);
        res.render("index.ejs", {
            data: result.data.drinks[0],
            ingridients: ingridientsList
        });
    } catch (error) {
        console.log(error.message);
    }
});

function getIngridientsList(data){
    var ingridientsList = new Map();
    for(var i = 1; i < 15; i++){
        const strIngredient = `strIngredient${i}`;
        const strMeasure = `strMeasure${i}`;
        const strIngredientResult = data[strIngredient];
        const strMeasureResult = data[strMeasure];

        if(strIngredientResult !== null && strMeasureResult !== null){
            ingridientsList.set(strIngredientResult, strMeasureResult);
        }
    }

    return ingridientsList;
}


app.listen(port, () => {
    console.log("App is listening on port: " + port);
})