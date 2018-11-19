import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux'
import './Settings.css';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index'

class Settings extends Component {

    state={
        profilePictureFile: null,
        profilePicture:null,
        inputs: null
    }

    handleSubmit(event) {
        event.preventDefault()
        var newSettings = {
            "displayName": this.state.inputs.username.value,
            "photoURL": this.state.profilePictureFile
        };
        this.props.updateSettings(newSettings);
    }

    handleFiles(evt) {
        var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
        let self = this
        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function (self) {
                return function() {
                    //document.getElementById(outImage).src = fr.result;
                    //self.props.changeSettings({"profilePicture": files[0]});
                    self.setState({
                        profilePictureFile: files[0],
                        profilePicture: fr.result
                    });
                }
            }(this)
            fr.readAsDataURL(files[0]);
        }

        // Not supported
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
        }


    }

    inputChangedHandler = (event, inputName) => {
        const updatedInputs = {
            ...this.state.inputs,
            [inputName]: {
                value: event.target.value,
                //valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation, this.state.isSignup),
                //touched:true
            }
        };
        this.setState({inputs:updatedInputs});
    }

    render() {
        return (
            <Aux>
                <div className="settings-container" onSubmit={this.handleSubmit.bind(this)}>
                    <form>
                        <div>
                            <img height="300px" src={this.state.profilePicture} />
                            <input type="file" onChange={this.handleFiles.bind(this)}></input>
                        </div>
                        <div className="setting-input-container">
                        <label className="setting-label">Username:</label>
                        <input 
                            type="text" 
                            className="setting-input username-input" 
                            onChange={(event) => this.inputChangedHandler(event, "username")}
                            placeholder="Username"></input>
                        
                        </div>
                        <div className="setting-input-container">
                        <label className="setting-label">Email:</label>
                        <input 
                            type="text" 
                            className="setting-input email-input" 
                            onChange={(event) => this.inputChangedHandler(event, "email")}
                            placeholder="Email"></input>
                        
                        </div>
                        <Button type="submit" theme="normal-button">Submit</Button>
                    </form>
                </div>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        settings: state.settings
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateSettings: (settings) => dispatch(actions.updateSettings(settings)),
        changeSettings: (settings) => dispatch(actions.changeSettings(settings)),
        updateAuthObject: (newAuthObject) => dispatch(actions.updateAuthObject(newAuthObject))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
