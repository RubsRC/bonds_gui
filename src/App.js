import './App.css';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import Workspace from './containers/Workspace';

function App() {
  return (
    <div className="App">
      <CustomLayout>
        <Workspace />
      </CustomLayout> 
    </div>
  );
}

export default App;
