
export default function BoxDivider({ text }) {

    return (
        <span className="mt-4 relative flex justify-center">
            <div
                className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-black to-transparent opacity-75"
            ></div>
            <span className="relative z-10 bg-slate-200 px-6 text-black font-bold text-lg">{text}</span>
        </span>
    )
}