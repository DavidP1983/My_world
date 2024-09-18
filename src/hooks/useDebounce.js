import { useState } from "react";


function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}

const useDebounce = () => {
    const [formVal, setFormVal] = useState({ username: '', password: '' });

    const debouncedInput = debounce((value, target, setFilter, filter) => {
        if (target === 'search') {
            setFilter({ ...filter, [target]: value })
        } else {
            setFormVal({ ...formVal, [target]: value })
        }
    }, 300)

    const handleChange = (e) => {
        const target = e.target.getAttribute('name');
        debouncedInput(e.target.value, target)
    }

    const handleChangeSearchInput = (e, setFilter, filter) => {
        const target = e.target.getAttribute('name');
        debouncedInput(e.target.value, target, setFilter, filter)
    }


    return { formVal, handleChange, handleChangeSearchInput, setFormVal }

}

export default useDebounce;