function Filter({ array, type }) {
  return (
    <fieldset>
      <legend>{type.charAt(0).toUpperCase() + type.slice(1) + ':'}</legend>
      {array?.map((elem, index) => {
        if (elem.count > 0) {
          return (
            <label key={index}>
              <input type="checkbox" name={elem.name} field={type}></input>
              {elem.name + ' (' + elem.count + ')'}
            </label>
          );
        }

        return null;
      })}
    </fieldset>
  );
}

export default Filter;
