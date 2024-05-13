type toastProps={
    message:string,
    type:string,
    handleClose:()=>void
}
const Toast = ({message,type,handleClose}:toastProps) => {
  return (
    <div className="fixed top-5 right-5 max-w-xs bg-rose-800 text-sm text-white rounded-xl shadow-lg dark:bg-neutral-900" role="alert">
    <div className="flex p-4">
      {message}

      <div className="ms-auto">
        <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100">
          <span className="sr-only">Close</span>
          <svg  type={type} onClick={handleClose} className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
  )
}

export default Toast