import React from 'react';
import { Button } from 'antd';
import route from './routes'
import 'antd/dist/antd.less';
import { useRoutes} from 'react-router-dom';
function App(props) {
    const element = useRoutes(
        route
    )
    return (
        <div>
            {element}
        </div>
    );
}

export default App;