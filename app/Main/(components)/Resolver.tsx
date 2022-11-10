const Resolver = ({ uri, resQL }) => {
  return (
    <p className="Resolver">
      <code>{JSON.stringify(uri)}</code>
    </p>
  );
};

export default Resolver;
