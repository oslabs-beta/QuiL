import DisplayContainer from './(components)/DisplayContainer';
import NavigationBar from './(components)/NavigationBar';
import Flow from './(flow)/Flow';

export default function Page() {
  return (
    // Parent component of reactflow needs a height and width in order to display
    <div>
      <NavigationBar />
      <DisplayContainer />
      <div style={{ height: '500px', width: '500px' }}>
      </div>
    </div>
  );
}
