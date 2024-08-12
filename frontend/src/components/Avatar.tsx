import React, { useMemo } from 'react';

type AvatarProps = {
  authorName: string;
  width?: string;
  height?: string;
};

const colors = ["#4285F4", "#DB4437", "#F4B400", "#0F9D58", "#4285F4", "#DB4437", "#F4B400", "#0F9D58"];

const Avatar: React.FC<AvatarProps> = ({ authorName, width = "w-8", height = "h-8" }) => {
  const initials = useMemo(() => {
    const [firstName, secondName] = authorName ? authorName.split(" ") : ["Anonymous"];
    return (firstName ? firstName[0] : '') + (secondName ? secondName[0] : '');
  }, [authorName]);

  const color = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [authorName]);

  return (
    <div 
      className={`relative inline-flex items-center justify-center ${width} ${height} mr-1 overflow-hidden rounded-full cursor-pointer`}
      style={{ backgroundColor: color }}
    >
      <span className="font-medium text-white">{initials.toUpperCase()}</span>
    </div>
  );
};

export default Avatar;