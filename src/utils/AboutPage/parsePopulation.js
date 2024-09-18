
const parsePopulation = (population) => {

    if (population.includes("million")) {
        return parseFloat(population.replace(" million", "")) * 1000000;
    } else {
        return parseInt(population.replace(/,/g, ""));
    }
}

export default parsePopulation;