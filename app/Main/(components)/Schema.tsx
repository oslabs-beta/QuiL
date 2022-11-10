const Schema = ({ uri, resQL }) => {
  console.log('line 2 ,', resQL);
  return (
    <p className="Schema">
      <code>{JSON.stringify(uri)}</code>
    </p>
  );
};

export default Schema;
