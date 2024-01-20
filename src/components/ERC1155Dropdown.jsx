export const ERC1155Dropdown = ({ items, setToken, value }) => {
    const handleChange = (event) => {
      setToken(event.target.value)
    }
    if (!items) return null;
    return (
      <select name="erc1155-tokens" id="erc1155-tokens" onChange={handleChange} value={value}>
        {items.map(item => (
          <option key={item.identifier} value={item.identifier}>
            {item.name} [Token {item.identifier}]
          </option>
        ))}
      </select>
    );
};