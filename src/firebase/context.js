import React from 'react';

/**
 * HOC that consumes the Firebase provided context Initialized in index.js
 * Lets each component that wraps itself in this HOC access this single firebase instance.
 * @type {React.Context<null>}
 */
const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;