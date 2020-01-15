import React, {Component} from "react";
import {
    Uppload, Camera, en, Local, Crop, Blur, Invert, Saturate, Sepia,
    Instagram, Facebook, Twitter, LinkedIn,
} from 'uppload';
import 'uppload/dist/uppload.css'
import "uppload/dist/themes/light.css";
import {withFirebase} from "../../../firebase";
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
            lang: en,
            uploader: (file, updateProgress) =>
                this.props.firebase.firebaseUploader(file, updateProgress, this.props.fileName, this.props.saveUrl)
        });
        this.uppload.use([
            // services order matters
            new Local(),
            // new Instagram(),
            // new Facebook(),
            // new Twitter(),
            // new LinkedIn(),
            // effects order matters
        ]);
    }

    open() {
       // const file = new Blob();
        // set listener for result
        this.uppload.on("upload", url => {
            this.setState({url});
          // we could also save the URL to our database here
            //  this.props.firebase.user(this.props.userId).update({imageUrl: url})
        });
        // open uploader
        this.uppload.open();
    }

    uploadFile() {

        const file = new Blob();

        this.uppload.upload(file)
            .then(url => {
                console.log("Uploaded URL", url);
            }).catch(error => {
            console.error("ERR", error);
        });
        console.log('done setting uploader');
        // open uploader
       // this.uppload.open();
    }


    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <img className={classes.image} alt="" src={this.state.url}/>
                <Button color="primary" onClick={this.uploadFile.bind(this)}>Select another Avatar</Button>
            </div>
        );
    }
}

export default compose (
    withFirebase,
    withStyles(styles)
)(ImageUpload)