import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

export default function FormDialog() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChangeClose = () => {
    console.log(name);
    dispatch({type: 'ADD_NEW_ORDER', payload: {id: state.user.id, name: name}})
    dispatch({type: 'FETCH_CURRENT_ORDER_ID', payload: {id: state.user.id}})
    setOpen(false);
    history.push(`/mixes`)    
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Order
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Add name for order
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            value={name}
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleChangeClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}