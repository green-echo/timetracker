export function createTicketsObject(tickets) {
  const obj = {};
  tickets.forEach(ticket => {
    obj[ticket.id.toString()] = ticket;
  });
  return obj;
}

export function handleDrag(result, state) {
  const { destination, source, draggableId } = result;

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

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

export function generateNewState(props) {
  const newState = {
    columns: {
      to_do: {
        id: 1,
        taskIds: props.to_do
      },
      in_progress: {
        id: 2,
        taskIds: props.in_progress
      },
      in_review: {
        id: 3,
        taskIds: props.in_review
      },
      done: {
        id: 4,
        taskIds: props.done
      }
    },
    numTickets: props.allTickets.length,
    tickets: createTicketsObject(props.allTickets)
  };
  return newState;
}

export function columnName(column) {
  switch (column.id) {
    case 1:
      return ['toDo', column.taskIds];
    case 2:
      return ['inProgress', column.taskIds];
    case 3:
      return ['inReview', column.taskIds];
    case 4:
      return ['done', column.taskIds];
    default:
      return null;
  }
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

export const millisConverted = milli => {
  const seconds = Number(milli / 1000);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
};
