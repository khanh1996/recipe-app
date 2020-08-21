import axios from "axios";

class Search {
    constructor(query) {
        this.query = query;
    }
    // Get API search
    async getApiSearch() {
        try {
            // This async call may fail.
            let resultApiSearch = await axios.get(
                `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
            );
            this.result = resultApiSearch.data.recipes;
        } catch (error) {
            // If it does we will catch the error here.
            alert(err);
        }
    }
}

export default Search;
