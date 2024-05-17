
import { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

export function useAnimation() {
    return useContext(AnimationContext);
}

export const AnimationProvider = ({ children }) => {
    const [showAnimation, setShowAnimation] = useState(false);

    return (
        <AnimationContext.Provider value={{ showAnimation, setShowAnimation }}>
            {children}
        </AnimationContext.Provider>
    );
};
