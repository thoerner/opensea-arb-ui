export const TraitsDropdown = ({ keys }) => {
    const keysToArray = (object) => {
        return Object.keys(object)
    }
    let array = keysToArray(keys)
    return array.map(key => {
        return (
            <option key={key} value={key}>{key}</option>
        );
    });
};