
const formatTimestamp = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleString()
}

export { formatTimestamp };