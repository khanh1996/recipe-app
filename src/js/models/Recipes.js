// công thức. 3 cái thì

// trả về 1 string
// B1 đồng bộ các unit đơn vị chữ dài thành chữ ngắn
// B2 remove đi những chú thích ở trong ngoặc đơn
// B3
// B4
import axios from 'axios';
export default class Recipes {
    constructor(recipe_id) {
        this.recipe_id = recipe_id;
    }
    async getApiRecipes() {
        try {
            const resultApiRecipes = await axios(
                `https://forkify-api.herokuapp.com/api/get?rId=${this.recipe_id}`
            );
            //console.log(resultApiRecipes);
            this.title = resultApiRecipes.data.recipe.title;
            this.image_url = resultApiRecipes.data.recipe.image_url;
            this.social_rank = resultApiRecipes.data.recipe.social_rank;
            this.publisher = resultApiRecipes.data.recipe.publisher;
            this.publisher_url = resultApiRecipes.data.recipe.publisher_url;
            this.ingredients = resultApiRecipes.data.recipe.ingredients;
        } catch (error) {
            alert(error);
        }
    }

    calcTime() {
        const numIn = this.ingredients.length / 3;
        const time = numIn * 15;
        this.time = time;
    }

    calcServing() {
        this.serving = 4;
    }

    parseIngredients() {
        // tablespoons => tbsp, cups => cup, ounce => oz
        const unitsLong = [
            'teaspoons',
            'teaspoon',
            'cups',
            'cup',
            'ounces',
            'ounce',
            'tablespoons',
            'tablespoon',
            'pound',
        ];
        const unitsShot = [
            'tsp',
            'tsp',
            'cup',
            'cup',
            'oz',
            'oz',
            'tbsp',
            'tbsp',
            'pound',
        ];

        const newIngredients = this.ingredients.map((el) => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();

            unitsLong.forEach((unit, index) => {
                ingredient = ingredient.replace(unit, unitsShot[index]);
            });

            // 2. Remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients to count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex((el2) =>
                unitsShot.includes(el2)
            );

            let objIng;

            if (unitIndex > -1) {
                const arrCount = arrIng.slice(0, unitIndex);
                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.splice(unitIndex + 1).join(' '),
                };
            } else if (parseInt(arrIng[0])) {
                // Not a unit, but is a number
                objIng = {
                    count: parseInt(arrIng[0]),
                    unit: '',
                    ingredient: arrIng.splice(1).join(' '),
                };
            } else if (unitIndex === -1) {
                // This is No a unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient,
                };
            }
            //console.log(objIng);
            return objIng;
        });

        this.ingredients = newIngredients;
    }

    updateTime(type) {
        if (this.time > 1 && type === 'decrease') {
            const numIn = this.ingredients.length / 3;
            const newTime = numIn * 15;
            this.time = newTime;
        }
    }

    updateServing(type) {
        // CT: serving_old: 4, serving_new: 5, count: 1 => count * (serving_new/serving_old);  => 1 * (5/4) = 1.25
        // update serving :
        const newServing =
            type === 'decrease' ? this.serving - 1 : this.serving + 1;

        this.ingredients.forEach((item) => {
            item.count = (item.count * newServing) / this.serving;
        });
        this.serving = newServing;
    }
}