import { useState } from "react";

const useFetching = (callback) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorMessage, setErrorMessage] = useState('');
    const [isScroll, setIsScroll] = useState(false);

    const fetchData = async (...args) => {
        try {
            setIsLoading(true);
            await callback(...args);
        } catch (e) {
            setErrorMessage(e.message);
            setIsError(true);
        } finally {
            setIsLoading(false);
            setIsScroll(true);

        }

    }

    return { isLoading, isError, fetchData, isErrorMessage, isScroll, setIsScroll };
}

export default useFetching;