import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {removeTicketThunk, updateTicketThunk} from '../actions/ticket'

class Ticket extends Component {
  render() {
    const { provided, innerRef, ticket } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
    <Card style={styles.cardContainer}>
              <CardContent>
                <form>
                <Typography
                  color="textSecondary" gutterBottom fontSize="14" style={{ fontWeight: 'bold' }}
                >
                  {ticket.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {Ticket.description}
      
              
                  Points left: {ticket.points}
                  {ticket.userId && <div>Assigned To: {ticket.currentUserEmail}</div>}
           
               </Typography>
                <CardActions>
                  <Button size="small"
                  >Modify</Button>
                  <Button  onClick={() => 
                  {  if (window.confirm('Are you sure you want to delete this ticket?')) 
                      this.props.remove(ticket)}}>Remove</Button> 
                </CardActions>
                </form>
              </CardContent>
            </Card>
       
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    remove: (ticket) => {
      dispatch(removeTicketThunk(ticket));
    },
    update:  (id, ticket)=> {
      dispatch( updateTicketThunk(id, ticket));
  }

  }
}
const styles = {
  cardContainer: {
    marginBottom: 8
  }
};


export default connect(null, mapDispatchToProps)(Ticket);
