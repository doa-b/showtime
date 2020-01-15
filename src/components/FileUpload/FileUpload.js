import React, {Component} from "react";
import File from "../ui/File/File";
import {withFirebase} from "../../firebase";
import {compose} from "redux";
import {withRouter} from 'react-router-dom'
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Fab from "@material-ui/core/Fab";
import {convertObjectstoArray, createUUID} from "../../shared/utility";
import Grid from "@material-ui/core/Grid";
import {CircularProgress} from "@material-ui/core";
import {withSnackbar} from "notistack";

/**
 * taken from tutorial: https://dev.to/clintdev/simple-firebase-image-uploader-display-with-reactjs-3aoo
 */

class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        let files = [];
        if (this.props.files) {
            files = convertObjectstoArray(this.props.files);
            console.log(files)
        }
        this.state = {
            file: null,
            url: "",
            progress: 0,
            files: files,
        };
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.setState(() => ({file}));
            this.handleUpload(file);
        }
    };

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    progress(progress) {
        this.setState({progress})
    }

    handleUpload = (file) => {
        console.log(file);
        const fileName = createUUID();
        let uploadTask = this.props.firebase.file(fileName).put(file);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({progress});
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                // complete function ...
                uploadTask.snapshot.ref.getDownloadURL()
                    .then(url => {
                        console.log(uploadTask.snapshot.ref);
                        const data = {
                            [fileName]: {
                                name: file.name,
                                url: url,
                                type: file.type,
                                size: file.size
                            }
                        };
                        this.setState({url, progress: 0});
                        this.props.firebase.addFileDataToElement(data, this.props.elementType, this.props.elementId)
                    });
            }
        );
    };

    handleDelete = (fileName) => {
        console.log(fileName);
        console.log(this.props.firebase.files().child(fileName));
        this.props.firebase.files().child(fileName).delete()
            .then(this.props.firebase.db.ref(`${this.props.elementType}/${this.props.elementId}/files`)
                .child(fileName)
                .remove().then(
                    this.props.enqueueSnackbar('file deleted', {
                            variant: 'warning'
                        }
                    )))
            .catch(error => {
                    this.props.enqueueSnackbar(error, {
                        variant: 'warning'
                    })
                }
            )
    };

    render() {
        return (
            <div>
                <Grid container spacing={2} style={{width: '90%', margin: 'auto'}}>
                    {this.state.files.map((file) => {
                        return (
                            <Grid item xs={12} sm={6} md={4} key={file.id}>
                                <File fileData={file}
                                      deleteClicked={() => this.handleDelete(file.id)}/>
                            </Grid>)
                    })}
                    <Grid container item xs={12} sm={6} md={4} justify='center' alignContent='center'>
                        {(this.state.progress) ? (
                            <CircularProgress variant="determinate" value={this.state.progress}/>
                        ) : (
                            <Fab size='large'
                                 variant='extended'
                                 color="primary"
                                 aria-label="add"
                                 onClick={this.handleClick}>
                                <NoteAddIcon fontSize='large'/>
                                Add File
                            </Fab>
                        )}
                    </Grid>
                </Grid>
                <input
                    type="file"
                    ref='fileUploader'
                    style={{display: 'none'}}
                    onChange={this.handleChange}/>
            </div>
        );
    }
}

export default compose(
    withRouter,
    withFirebase,
    withSnackbar
)(FileUpload);
