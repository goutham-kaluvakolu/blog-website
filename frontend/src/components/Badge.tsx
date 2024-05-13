
interface BadgeProps {
  name: string;
  handleRemoveBadge: () => void; // Correct the type of handleRemoveBadge
}

const Badge = ({ name, handleRemoveBadge }:BadgeProps) => {
  return (
    <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium bg-slate-100 rounded">
      {name}
      <button type="button" className="inline-flex items-center p-1 ms-2 text-sm bg-transparent rounded-sm hover:bg-red-200 hover:text-red-900 cursor-pointer" data-dismiss-target="#badge-dismiss-default" aria-label="Remove" onClick={handleRemoveBadge}>
        <svg className="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
        <span className="sr-only">Remove badge</span>
      </button>
    </span>
  );
};

export default Badge;
