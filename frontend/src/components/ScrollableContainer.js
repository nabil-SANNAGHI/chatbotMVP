import { useRef, useEffect } from 'react';

const ScrollableContainer = ({ children, className }) => {
    const containerRef = useRef(null);

    // Scroll to bottom when children change
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [children]);

    return (
        <div ref={containerRef} className={`overflow-y-auto ${className}`}>
            {children}
        </div>
    );
};

export default ScrollableContainer;