import React from 'react';
import { ProjectBoard } from './project-board';
import { connect } from 'react-redux';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';

class Project extends React.Component {
  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem active>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
              Donec id elit non mi porta gravida at eget metus. Maecenas sed
              diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { data: state.projects };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
