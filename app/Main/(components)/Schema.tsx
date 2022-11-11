const Schema = ({ uri, resQL }) => {
  return (
    <p className="Schema">
      <code>{JSON.stringify(resQL)}</code>
    </p>
  );
};

export default Schema;
