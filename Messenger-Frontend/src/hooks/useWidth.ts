import { useCallback, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const useComponentWidth = () => {
    const [width, setWidth] = useState(0);
    const [ready, setReady] = useState(false);

    const onLayout = useCallback((event: LayoutChangeEvent) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
        setReady(true);
    }, []);

    return [width, onLayout, ready] as const;
};
