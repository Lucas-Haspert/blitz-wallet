export const datetimeFormatted = (datetime) => {
    if (datetime === null) {
        return "";
    }

    // Get the datetime formatted
    var datetimeFormatted = datetime.toString().substring(0, 19).replace("T", " ");

    var year = datetimeFormatted.substring(0, 4)
    var month = datetimeFormatted.substring(5, 7)
    var day = datetimeFormatted.substring(8, 10)
    var hour = datetimeFormatted.substring(11, 13)
    var minutes = datetimeFormatted.substring(14, 16)

    // Rearrange the format
    return day + "/" + month + "/" + year + " " + hour + ":" + minutes
}