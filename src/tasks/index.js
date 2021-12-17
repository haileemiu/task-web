import { Switch, Route, useRouteMatch } from 'react-router-dom';
import New from './New';
import List from './List';
import Update from './Update';
import Task from './Task';

// entire sub-router of tasks

export default function Tasks() {
    const route = useRouteMatch();

    return (
        <Switch>
            <Route path={`${route.url}/new`}>
                <New />
            </Route>

            <Route path={`${route.url}/:id/update/`}>
                <Update />
            </Route>

            <Route path={`${route.url}/:id`}>
                <Task />
            </Route>

            <Route>
                <List />
            </Route>


            
        </Switch>
    )
}