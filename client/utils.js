export function createTicketsObject(tickets) {
  const obj = {};
  tickets.forEach(ticket => {
    obj[ticket.id.toString()] = ticket;
  });
  return obj;
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
