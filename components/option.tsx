export const Option = ({ data }) => {
  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((data) => {
          return (
            <option key={data.id} value={data.id} id={data.id}>
              {data.name}
            </option>
          );
        })}
    </>
  );
};
