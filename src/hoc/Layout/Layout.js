import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Navigation from '../../components/Navigation/Navigation';

class Layout extends Component {
    render() {
        return(
            <Aux>
                <Navigation></Navigation>
                <main style={{"z-index": 0}}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;