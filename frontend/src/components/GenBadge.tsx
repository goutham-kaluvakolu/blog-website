
interface GenBadgeProps {
    name: string;
  }
  
  const GenBadge = ({ name }:GenBadgeProps) => {
    return (
      <span id="badge-dismiss-default" className="inline-flex items-center px-2 py-1 me-2 text-sm  text-black bg-slate-100 rounded ">
        {name}
      </span>
    );
  };
  
  export default GenBadge;
  