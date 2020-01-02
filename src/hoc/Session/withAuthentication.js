import React from 'react';
import {AuthUserContext} from "./index";
import { withFirebase } from "../../firebase";

/**
 * Stores the merged (realtime db & internal auth) user in its internal state and makes it available
 * through the context in wrapped component
 * @param Component that needs to be wrapped with this HOC
 * @returns wrapped Component with Context
 */
const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser: null,
            };
        }

        /**
         * if user is authenticated it puts the userData in authUser state, else Null
         */
        componentDidMount() {
            this.listener = this.props.firebase.onAuthUserListener(
                authUser => {
                    this.setState({authUser});
                },
                () => {
                    this.setState( { authUser: null });
                }
                );
        }

        componentWillUnmount() {
            this.listener();
        }

        /**
         *
         * @returns {A wrapped component with authUser object as its props taken from context}
         */
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                <Component {...this.props} />
                </AuthUserContext.Provider>
                );
        }
    }
    return withFirebase(WithAuthentication);
};
export default withAuthentication;