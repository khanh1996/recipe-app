import axios from "axios";

export default class Search {
    constructor(query) {
        this.query = query;
    }
    // Get API search
    async getApiSearch() {
        try {
            // This async call may fail.
            const resultApiSearch = await axios(
                `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
            );
            this.result = resultApiSearch.data.recipes;
        } catch (error) {
            // If it does we will catch the error here.
            alert(error);
        }
    }
}
