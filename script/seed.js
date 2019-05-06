'use strict';

const db = require('../server/db');
const { User, Project, Ticket, UserTicket } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123' }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({ email: 'test@email.com', password: '123' }),
    User.create({ email: 'betzalel@email.com', password: '123' }),
    User.create({ email: 'ariel@email.com', password: '123' })
  ]);

  const projects = await Promise.all([
    Project.create({ name: 'Netflix', totalTime: 20 }),
    Project.create({ name: 'Hersheys Frontend', totalTime: 30 }),
    Project.create({ name: 'Hersheys Backend', totalTime: 60 })
  ]);

  projects[0].setUsers([users[0], users[1], users[2]]);
  projects[1].setUsers([users[0], users[1], users[2]]);
  projects[2].setUsers([users[1]]);

  const netflixTickets = await Promise.all([
    Ticket.create({
      title: 'API',
      description: 'create routes',
      points: 3,

      status: 'in_progress'
    }),
    Ticket.create({
      title: 'REACT component',
      description: 'create component',
      points: 5,

      status: 'to_do'
    }),
    Ticket.create({
      title: 'seed file',
      description: 'create seed file',
      points: 3,

      status: 'in_review'
    }),
    Ticket.create({
      title: 'bootstrap',
      description: 'install bootstrap',
      points: 3,
      status: 'done'
    })
  ]);

  const hersheyFrontEndTickets = await Promise.all([
    Ticket.create({
      title: 'API',
      description: 'create routes',
      points: 3,

      status: 'in_progress'
    }),
    Ticket.create({
      title: 'REACT component',
      description: 'create component',
      points: 5,

      status: 'to_do'
    }),
    Ticket.create({
      title: 'seed file',
      description: 'create seed file',
      points: 3,

      status: 'in_review'
    }),
    Ticket.create({
      title: 'bootstrap',
      description: 'install bootstrap',
      points: 3,
      status: 'done'
    })
  ]);

  const hersheyBackEndTickets = await Promise.all([
    Ticket.create({
      title: 'API',
      description: 'create routes',
      points: 3,

      status: 'in_progress'
    }),
    Ticket.create({
      title: 'REACT component',
      description: 'create component',
      points: 5,

      status: 'to_do'
    }),
    Ticket.create({
      title: 'seed file',
      description: 'create seed file',
      points: 3,

      status: 'in_review'
    }),
    Ticket.create({
      title: 'bootstrap',
      description: 'install bootstrap',
      points: 3,
      status: 'done'
    })
  ]);

  //putting all tickets under first Project
  for (let i = 0; i < netflixTickets.length; i++) {
    await netflixTickets[i].setProject(projects[0]);
  }

  for (let i = 0; i < hersheyFrontEndTickets.length; i++) {
    await hersheyFrontEndTickets[i].setProject(projects[1]);
  }

  for (let i = 0; i < hersheyBackEndTickets.length; i++) {
    await hersheyBackEndTickets[i].setProject(projects[2]);
  }

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
