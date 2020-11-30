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

export default function MixFormDialog(props) {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const history = useHistory();

  // state variables
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  // on click of adding new order, change the state status to true
  const handleClickOpen = () => {
      console.log(props.item, props.size, 'open');
    setOpen(true);
  };
  // on closing the input form add mix to order and fetch mixes in order from db
  const handleChangeClose = () => {
    dispatch({type: 'ADD_MIX_TO_ORDER', payload: {mix_size_id: props.item, order_id: state.order.orderId, name: name}});    
    dispatch({type: 'FETCH_MIXES_IN_ORDER', payload: state.order.orderId});    
    setOpen(false);
  };
  // on click of canceling a new order, change state status to false and close input form
  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <div>
      <Button variant="outlined-light" className="addMixBtn text-light" onClick={handleClickOpen}>
        {props.size} lb mix
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>
           Name of mix:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mix"
            label="Mix"
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