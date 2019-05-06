import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { removeTicketThunk, updateTicketThunk } from '../actions/ticket';

class StatusColumn extends React.Component {
  render() {
    const { elem, index } = this.props;
    return (
      <Draggable draggableId={String(elem.id)} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Card style={styles.cardContainer}>
              <CardContent>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  fontSize="14"
                  style={{ fontWeight: 'bold' }}
                >
                  {elem.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {elem.description}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Points left: {elem.points}
                </Typography>
                <CardActions>
                  <Button size="small">Modify</Button>
                  <Button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this ticket?'
                        )
                      )
                        this.props.remove(elem);
                    }}
                  >
                    Remove
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

const styles = {
  cardContainer: {
    marginBottom: 8
  }
};

const mapDispatchToProps = dispatch => {
  return {
    remove: ticket => {
      dispatch(removeTicketThunk(ticket));
    },
    update: (id, ticket) => {
      dispatch(updateTicketThunk(id, ticket));
    }
  };
};

export default connect(null, mapDispatchToProps)(StatusColumn);
