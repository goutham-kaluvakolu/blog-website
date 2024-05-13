export const getReadTime=(content:string)=>{
    if (content){
        return Math.round(content.length/60)?Math.round(content.length/40):1
    }
    return 0
}

export const getDate = (inputDate: string) => {

    // Create a new Date object
    const date = new Date(inputDate);

    // Array of month names
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Get the day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    // console.log(formattedDate); // Output: "11 May 2024"
    return formattedDate

}
