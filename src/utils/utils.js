export const convertToRequiredDateFormat = (dateString, format = 'yyyy-mm-dd') => {
    // Parse the date string to a JavaScript Date object
    const date = new Date(dateString);
  
    // Get the day, month, and year
    const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if day < 10
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = date.getFullYear();

    let formattedDate = '';
    if (format === 'yyyy-mm-dd') {
        formattedDate = `${year}-${month}-${day}`;
    }
  
    return formattedDate;
}