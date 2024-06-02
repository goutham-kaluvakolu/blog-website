
function Tooltip({ children, message }: { children: React.ReactNode; message: string }) {

    return (
        <div className='has-tooltip'>
            <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8 text-xs'>{message}</span>
            {children}

        </div>
    );
}

export default Tooltip;
