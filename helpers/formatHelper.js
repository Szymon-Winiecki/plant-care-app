
const formatTimestamp = (timestamp) => {
    if (timestamp == null) {
        return '-';
    }

    return new Date(parseInt(timestamp)).toLocaleString()
}

export { formatTimestamp };