function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);

    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");

    if (regex.test(inputText)){
        return true;
    } else{
        return false;
    }    
}

export { checkForName }
