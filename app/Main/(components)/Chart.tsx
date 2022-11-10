import Flow from '../(flow)/Flow';

const Chart = ({ resQL }) => {
  console.log(resQL, ' inside the chart');
  /*
  the input field above the chart (visualizeDB) would have a fetch request
  they input their database
  we display it in here
  */
  return (
    <div className="Chart">
      <Flow />
    </div>
  );
};

export default Chart;
