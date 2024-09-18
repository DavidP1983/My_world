import axios from "axios";

export default class PostService {

    static async getAll(page, limit = 5) {
        const response = await axios.get(`https://freetestapi.com/api/v1/destinations${page ? `/${page}` : ''}`, {
            params: {
                limit: page ? '' : limit
            }
        });
        return response.data;
    }

    static async getByPage(currentPage) {
        const response = await axios.get(`https://freetestapi.com/api/v1/destinations/${currentPage}`);
        return response.data;
    }


    static async getById(id) {
        const response = await axios.get(`https://freetestapi.com/api/v1/destinations/${id}`);
        return response.data;
    }

    static async getByPopulation() {
        const counties = await axios.get(`https://freetestapi.com/api/v1/destinations`);
        const population = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/countries-codes/records?select=iso2_code%2C%20iso3_code%2C%20label_en&group_by=iso2_code%2C%20iso3_code%2C%20label_en`);
        let [res1, res2] = await axios.all([counties, population]);
        return [res1.data, res2.data.results];
    }

}