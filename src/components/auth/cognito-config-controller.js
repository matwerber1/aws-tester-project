import React, { useState } from 'react';
import { view } from '@risingstack/react-easy-state';
import 'cross-fetch/polyfill';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import appStore from '../common/app-store';

const CognitoConfigController = view(() => {

  const [showConfig, setShowConfig] = useState(false);

  const toggleShowConfig = () => {
    setShowConfig(!showConfig);
  }
  
  return (
    <React.Fragment>
      <Grid item>
      <Button onClick={toggleShowConfig} color="primary" variant="contained">
        Configure Cognito
      </Button>
    </Grid>
      <CognitoConfigureDialog
          showDialog={showConfig}
          toggleDialog={toggleShowConfig} 
      />
    </React.Fragment>
  );
});

const CognitoConfigureDialog = view(({ showDialog, toggleDialog }) => {

  const [dialogValues, setDialogValues] = useState(appStore.cognito.config);

  function updateDialogValue(key, value) {
    // We have to copy the object rather than just use its pointer
    let newValues = Object.assign({}, dialogValues);
    newValues[key] = value;
    setDialogValues(newValues);
  }

  function closeDialogWithSave() {
    appStore.cognito.config = dialogValues;    
    appStore.saveStateToCookies();
    console.log('Wrote cognito config to appStore:', dialogValues);
    appStore.cognito.checkConfigIsComplete();
    closeDialog();
  }

  function closeDialogWithoutSave() {
    setDialogValues(appStore.cognito.config);
    closeDialog();
  }

  function closeDialog() {
    toggleDialog();
  }

  return (
    <Dialog open={showDialog} onClose={closeDialogWithoutSave} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cognito Configuration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to log in to your Cognito User Pool, please enter the required information below:
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="userPoolId"
          label="Cognito User Pool ID"
          onChange={ev => updateDialogValue('userPoolId', ev.target.value)}
          value={dialogValues.userPoolId}
          fullWidth
        />
        <TextField
          margin="dense"
          id="clientId"
          label="Cognito Client ID"
          onChange={ev => updateDialogValue('clientId', ev.target.value)}
          value={dialogValues.clientId}
          fullWidth
        />
        <TextField
          margin="dense"
          id="identityPoolId"
          label="Cognito Identity Pool ID"
          fullWidth
          onChange={ev => updateDialogValue('identityPoolId', ev.target.value)}
          value={dialogValues.identityPoolId}
        />
        <TextField
          margin="dense"
          id="region"
          label="Cognito AWS Region"
          fullWidth
          onChange={ev => updateDialogValue('region', ev.target.value)}
          value={dialogValues.region}
        />
      </DialogContent>
       <DialogActions>
        <Button onClick={closeDialogWithoutSave} color="primary">
          Cancel
          </Button>
        <Button onClick={closeDialogWithSave} color="primary">
          Save
          </Button>
      </DialogActions>
    </Dialog>
  );
});

export default CognitoConfigController; 