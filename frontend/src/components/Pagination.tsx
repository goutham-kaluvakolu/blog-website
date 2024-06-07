
const Pagination = ({ handlePageChange, currentPage ,totalPages}: { handlePageChange: (page: number) => void, currentPage: number ,totalPages: number}) => {
    return (
        <div className="flex justify-between w-full mt-10">
            <a onClick={() => {
                currentPage - 1 <= 0 ? handlePageChange(1) : handlePageChange(currentPage - 1)
            }} href="#" className="flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white   hover:bg-gray-100 hover:text-gray-700 ">
                <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
                </svg>
                Previous
            </a>
            <a onClick={() =>
                 currentPage + 1 > totalPages ? handlePageChange(totalPages) :
                 handlePageChange(currentPage + 1)} href="#" className="flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 ">
                Next
                <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    )
}

export default Pagination