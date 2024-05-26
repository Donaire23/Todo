export const nullOrUndefined = (value) => {
    if(value === null || value === '' || value.length === 0) {
        return null
    }
}