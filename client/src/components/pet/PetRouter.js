import React from 'react';
import Pets from './Pets';
import PetCreate from './create/PetCreate';
import PetWall from './PetWall';
import AuthRoute from './../AuthRoute';

const PetRouter = ({ match }) => {
    return (
        <React.Fragment>
            <AuthRoute exact path={`${match.url}`} component={Pets}/>
            <AuthRoute exact path={`${match.url}/create`} component={PetCreate}/>
            <AuthRoute exact path={`${match.url}/:petId/wall`} component={PetWall}/>
        </React.Fragment>
    );
}

export default PetRouter;