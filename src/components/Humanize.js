//converts the string to be read by humans
const Humanize = (str) => {
    let result = str.replace(/(^\w)|(_\w)/g, (match) => match.toUpperCase());
    result = result.replace("_", " ");
    return result;
    }

export default Humanize;