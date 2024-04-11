export default function Button( {children}: Readonly<{children: React.ReactNode}> ) {
    return (
        <button className="px-4 py-2 bg-primary text-text rounded hover:bg-secondary" >
            {children}
        </button>
    )
}
