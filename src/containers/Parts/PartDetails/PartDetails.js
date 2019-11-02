import React, {Component} from 'react';

import Autocomplete from '../../../components/ui/CustomAutocomplete/Autocomplete'

import classes from './PartDetails.module.css'


/**
 * Created by Doa on 2-11-2019.
 */
class PartDetails extends Component {

    render() {

        return (<div>
            <Autocomplete isMulti/>
        </div>);

    }
}

export default PartDetails;