import { useState, useEffect, useRef } from 'react';

export default function useVisible(initial: Boolean) {
    const [visible, setVisible] = useState(initial);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as HTMLDivElement)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return { ref, visible, setVisible };
}
