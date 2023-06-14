const addDays = (timestamp, days) => {
    return (timestamp + days * 24 * 60 * 60 * 1000);
}

const getDiffInDays = (timestamp1, timestamp2) => {
    return (timestamp2 - timestamp1) / (24 * 60 * 60 * 1000);
}

export { addDays, getDiffInDays };