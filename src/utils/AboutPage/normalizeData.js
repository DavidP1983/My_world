

const normalizeData = (counties, code) => {

    const countyNormalize = counties.reduce((acc, curr) => {
        (acc[curr.country] = acc[curr.country] || []).push(curr)
        return acc
    }, {});


    Object.keys(countyNormalize).map((key) => {
        code.forEach((codes) => {
            let incorrectAPIData = null;

            switch (codes.label_en) {
                case 'Russian Federation':
                    incorrectAPIData = 'Russia';
                    break;
                case 'Korea, Republic of':
                    incorrectAPIData = 'South Korea';
                    break;
                default:
                    incorrectAPIData = codes.label_en;
            }

            const code = incorrectAPIData.toLowerCase().match(/(\w*\s\w*)|(\w*)/g)[0].replace(/ /, '');
            const keys = key.toLowerCase().match(/(\w*\s\w*)|(\w*)/g)[0].replace(/ /, '');

            if (code === keys) {
                countyNormalize[key].map((item) => Object.assign(item, { code: codes["iso2_code"] }))
            }
        });


    });

    return [countyNormalize]
}

export default normalizeData;