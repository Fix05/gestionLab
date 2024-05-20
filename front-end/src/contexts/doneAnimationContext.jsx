import { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

export function useAnimation() {
    return useContext(AnimationContext);
}

export const AnimationProvider = ({ children }) => {
    const [showAnimation, setShowAnimation] = useState(false);
    const [gif, setGif] = useState("");  // Inicializa con un componente nulo
    const [message, setMessage] = useState("");  // Inicializa con un componente nulo

    const renderComponent = gif ? gif : null; // Renderiza el componente guardado o null si no hay ninguno

    return (
        <AnimationContext.Provider value={{ showAnimation, setShowAnimation, renderComponent, setGif, message, setMessage }}>
            {children}
        </AnimationContext.Provider>
    );
};
