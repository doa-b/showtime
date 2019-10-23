import * as actions from '../store/actions';
import { connect } from 'react-redux';

const addDummyShowToDatabase = (props) => {
    const show = {
    name: 'Trinity International Trend Day',
    location: 'Beursgebouw Zwitserland',
    date: '12-1-2019'
    };
    props.onSave('shows', show);

};

const addDummyBlocksToDatabase = () => {

};

const addDummyPartsToDatabase = () => {

};

const addDummyScenesToDatabase = () => {

};

const addDummyUsersToDatabase = () => {

};

const addDummyDataToDatabase = (props) => {
    const show = {
        name: 'Trinity International Trend Day',
        location: 'Beursgebouw Zwitserland',
        date: '12-1-2019'
    };
    props.onSave('shows', show);
    return;

};

const mapDispatchToProps = (dispatch) => {
    return {
        onSave: (element, data) => dispatch(actions.save(element, data))
    }
};

export default connect(null, mapDispatchToProps)(addDummyDataToDatabase)
