
const removeDublicate = (arr) => {
    const newArr = arr.filter((item, index, posts) => {
        return index === posts.findIndex(obj => {
            return item.id === obj.id
        })
    });
    return newArr;
}

export default removeDublicate; 