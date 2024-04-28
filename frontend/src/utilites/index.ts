export const getReadTime=(content:string)=>{
    if (content){
        return Math.round(content.length/60)?Math.round(content.length/40):1
    }
    return 0
}