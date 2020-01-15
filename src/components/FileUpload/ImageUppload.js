import React, {Component} from "react";
import {
    Uppload, Camera, en, Local, Crop, Blur, Invert, Saturate, Sepia,
    Instagram, Facebook, Twitter, LinkedIn
} from 'uppload';
import 'uppload/dist/uppload.css'
import "uppload/dist/themes/light.css";
import {withFirebase} from "../../firebase";
import { compose } from "redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button} from "@material-ui/core";

const styles = theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    image: {
        width: 150,
        height: 150
    }
});

let defaultImage =
    "https://images.unsplash.com/photo-1557137848-12de044c6f84?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixid=eyJhcHBfaWQiOjF9&ixlib=rb-1.2.1&q=80&w=400";

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        if (this.props.imageUrl) {
            defaultImage = this.props.imageUrl
        }
        this.state = {
            url: defaultImage,
            ready: false
        };
    }

    componentDidMount() {
        this.uppload = new Uppload({
            maxSize: [150, 150],
            compression: 0.8, // between 1 (highest quality to 0 highest compression
            lang: en,
            defaultService: "local",
            uploader: (file, updateProgress) =>
                this.props.firebase.firebaseUploader(file, updateProgress, this.props.fileName, this.props.saveUrl)
        });
        // Camera plugin  is built for non-mobile devices (like laptops with webcams)
        // since the native file picker (for Uppload, that is the Local service)
        // allows users to click photos in all major mobile operating systems.
        this.uppload.use([
            // services order matters
            new Local(),
            new Camera(),
            new Instagram(),
            new Facebook(),
            new Twitter(),
            new LinkedIn(),

            // effects order matters
            new Crop({
                aspectRatio: 1,
            }),
            new Blur(),
            new Invert(),
            new Saturate(),
            new Sepia(),
        ]);
    }


    open() {
        // set listener for result
        this.uppload.on("upload", url => {
            this.setState({url});
          // we could also save the URL to our database here
            //  this.props.firebase.user(this.props.userId).update({imageUrl: url})
        });
        // open uploader
        this.uppload.open();
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <img className={classes.image} alt="" src={this.state.url}/>
                <Button color="primary" onClick={this.open.bind(this)}>Select another Avatar</Button>
            </div>
        );
    }
}

export default compose (
    withFirebase,
    withStyles(styles)
)(ImageUpload)