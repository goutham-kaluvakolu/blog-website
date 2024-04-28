 type AvatorProps = {
    authorName:string,
    width?:string
    hieght?:string
 }
 
 const Avatar = ({ authorName,width="w-5",hieght="h-5" }: AvatorProps) => {
    console.log(authorName)
    const [firstName, secondName] = authorName?authorName.split(" "):"Anonymous".split(" ");

    const initials = (firstName ? firstName[0] : '') + (secondName ? secondName[0] : '');

    return (
      
        <div className={`relative inline-flex items-center justify-center ${width} ${hieght} mr-1 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className="font-medium text-gray-600 dark:text-gray-300">{initials}</span>
        </div>
    );
}

export default Avatar;