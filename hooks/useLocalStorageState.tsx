import { useEffect, useState } from "react";

function useLocalStorageState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        const storedState = localStorage.getItem(key);
        return storedState ? JSON.parse(storedState) : defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

export default useLocalStorageState;