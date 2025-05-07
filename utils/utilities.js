export function GetFullDate( useAmericanNotation=false) {
    var date = new Date();
    if(useAmericanNotation)
    {
        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
    }
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function GetFullDateTime(useAmericanNotation=false)
{
    var date = new Date();
    return `${GetFullDate(useAmericanNotation)} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}