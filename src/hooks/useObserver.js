import { useRef, useEffect } from "react";

const useObserver = (isLoading, currentPage, filter, isScroll, islimitValid, posts, ref, changeLimit) => {
    //Сохранение данных
    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        const callback = function (entries) {
            if (entries[0].isIntersecting && currentPage && filter && isScroll && islimitValid) {
                changeLimit();
            }
        };

        observer.current = new IntersectionObserver(callback);
        observer.current.observe(ref.current)

        return () => {
            if (observer.current) observer.current.disconnect();
        }


    }, [islimitValid, isLoading, filter, posts]);


};

export default useObserver;