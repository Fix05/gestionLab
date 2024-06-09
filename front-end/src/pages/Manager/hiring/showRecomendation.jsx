import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

const postionColor = {
    "1": "rgb(254 240 138)",
    "2": "rgb(212 212 212)",
    "3": "rgb(255 237 213)"
}

export default function ShowRecomendation({ results }) {

    const candidates = Object.keys(results)

    const openCandidates = candidates.reduce((accu, curr) => {
        accu[curr] = false
        return accu
    }, {})



    const [isOpen, setIsOpen] = useState(openCandidates);

    const handleClick = (id) => {
        setIsOpen({
            ...isOpen, [id]: !isOpen[id]
        })
    }



    return (
        <MagicMotion
            transition={{ type: "spring", stiffness: 180, damping: 20, mass: 1.1 }}
        >
            {candidates.map((candidate, index) => (

                <div className={`border-solid border-[2px] border-indigo-400 shadow p-4 rounded-lg my-4 overflow-hidden`} style={{ borderRadius: 12, backgroundColor: postionColor[results[candidate]["position"]] }}>
                    <button className="font-medium w-full text-left flex justify-between items-center" onClick={() => handleClick(candidate)}>
                        N° {results[candidate]["position"]} {candidate}

                        <svg
                            key="exclude"
                            style={{
                                transform: `rotate(${isOpen[candidate] ? 180 : 0}deg)`,
                                transition: "320ms ease-in-out",
                            }}
                            width="20"
                            height="20"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4.5 10L15.6714 21L27.5 10"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {isOpen[candidate] && (
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="bg-green-100 p-2 rounded shadow">
                                <p className="text-gray-700 font-semibold">Puntos positivos</p>
                                <ul>
                                    {results[candidate]["positive"].map((point) => (
                                        <li className="text-sm text-gray-700">-{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-red-50 p-2 rounded shadow">
                                <p className="text-gray-700 font-semibold">Puntos negativos</p>
                                <ul>
                                    {results[candidate]["negative"].map((point) => (
                                        <li className="text-sm text-gray-700">-{point}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded shadow">
                                <p className="text-gray-700 font-semibold">Requerimientos cumplidos</p>
                                <ul>
                                    {results[candidate]["requirements"].map((point) => (
                                        <li className="text-sm text-gray-700">-{point}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

            ))}

        </MagicMotion>
    )
}