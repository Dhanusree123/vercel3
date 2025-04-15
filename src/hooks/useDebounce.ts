import { useEffect, useState } from "react";

const useDebounce = <T>(value:T,delay=500) => {
    const [debouncedValue, setDebouncedvalue] = useState<T>(value);
    const [,setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
        const handler = setTimeout(() => {
          setDebouncedvalue(value);
        }, delay);
        return () => {
          clearTimeout(handler);
        };
      }, [value,delay]);
      return debouncedValue
}

export default useDebounce