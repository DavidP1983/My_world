import { useMemo } from "react";

//Сортировка по поуляции

//Мемоизация при сортировки
export const useSelectSort = (posts, sort) => {
    const sortedPost = useMemo(() => {
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        } else {
            return posts;
        }
    }, [sort, posts]);

    return sortedPost;
}

//Поиск
export const useSelectAndFilterSort = (posts, sort, search) => {
    const sortedPost = useSelectSort(posts, sort);
    const searchPostAndSortedPost = useMemo(() => {

        return sortedPost.filter((item) => item.country.toLocaleLowerCase().includes(search));
    }, [search, sortedPost]);

    return searchPostAndSortedPost;
}

