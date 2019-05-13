export function handleDrag(source, destination, draggableId, state) {
  const start = state.columns[source.droppableId];
  const finish = state.columns[destination.droppableId];

  if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      id: source.droppableId,
      taskIds: newTaskIds
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    };

    return newState;
  }

  const startTaskIds = Array.from(start.taskIds);

  startTaskIds.splice(source.index, 1);
  const newStart = {
    id: source.droppableId,
    taskIds: startTaskIds
  };

  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    id: destination.droppableId,
    taskIds: finishTaskIds
  };

  const newState = {
    ...state,
    columns: {
      ...state.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    }
  };

  return newState;
}

export function handleDragProps(source, destination, draggableId, props) {
  const start = props.columns[source.droppableId];
  const finish = props.columns[destination.droppableId];

  if (start === finish) {
    const newTaskIds = Array.from(start.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      id: source.droppableId,
      taskIds: newTaskIds
    };
    const newState = {
      ...props,
      columns: {
        ...props.columns,
        [newColumn.id]: newColumn
      }
    };

    return newState;
  }

  const startTaskIds = Array.from(start.taskIds);

  startTaskIds.splice(source.index, 1);
  const newStart = {
    id: source.droppableId,
    taskIds: startTaskIds
  };

  const finishTaskIds = Array.from(finish.taskIds);
  finishTaskIds.splice(destination.index, 0, draggableId);
  const newFinish = {
    id: destination.droppableId,
    taskIds: finishTaskIds
  };

  const newState = {
    ...props,
    columns: {
      ...props.columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish
    }
  };

  return newState;
}

export function createTicketsObject(tickets) {
  const obj = {};
  tickets.forEach(ticket => {
    obj[ticket.id.toString()] = ticket;
  });
  return obj;
}

export function generateNewState(props) {
  const newState = {
    columns: {
      to_do: {
        id: 'to_do',
        taskIds: props.to_do
      },
      in_progress: {
        id: 'in_progress',
        taskIds: props.in_progress
      },
      in_review: {
        id: 'in_review',
        taskIds: props.in_review
      },
      done: {
        id: 'done',
        taskIds: props.done
      }
    },
    tickets: createTicketsObject(props.allTickets)
  };
  return newState;
}

export function generateNewColumns(payload) {
  return {
    to_do: {
      id: 'to_do',
      taskIds: payload.to_do
    },
    in_progress: {
      id: 'in_progress',
      taskIds: payload.in_progress
    },
    in_review: {
      id: 'in_review',
      taskIds: payload.in_review
    },
    done: {
      id: 'done',
      taskIds: payload.done
    }
  };
}

const tickets = {
  '1': {
    id: 1,
    title: 'create User',
    desc: 'idk',
    points: 1,
    status: 'to do'
  },
  '2': {
    id: 2,
    title: 'create footer',
    desc: 'idk2',
    points: 4,
    status: 'to do'
  },
  '3': {
    id: 3,
    title: 'create nav',
    desc: 'idk',
    points: 1,
    status: 'in progress'
  },
  '4': {
    id: 4,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in progress'
  },
  '5': {
    id: 5,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'in review'
  },
  '6': {
    id: 6,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'in review'
  },
  '7': {
    id: 7,
    title: 'have fun',
    desc: 'idk',
    points: 1,
    status: 'done'
  },
  '8': {
    id: 8,
    title: 'create footer',
    desc: 'idk2',
    points: 3,
    status: 'done'
  }
};
