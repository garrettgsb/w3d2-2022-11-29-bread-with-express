const fs = require('fs');

function readCounter() { return Number(fs.readFileSync('./counter')); }
function writeCounter(value) { return fs.writeFileSync('./counter', String(value));  }

function increment() { writeCounter(readCounter() + 1); }
function decrement() { writeCounter(readCounter() - 1); }
function setTo(value) { writeCounter(Number(value)); }
function reset() { setTo(0); }


// Mapping between Javascript functions and command line interface
{
  const [_interpreter, _file, operation, value] = process.argv;
  // const [operation, value] = process.argv.slice(2);
  console.log(process.argv);
  if (operation === 'increment') { increment(); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'decrement') { decrement(); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'set') { setTo(value); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'reset') { reset(); console.log(`After ${operation}: ${readCounter()}`)}
  else if (operation === 'webserver') { letsRunSomeExpress(); }
  else { console.log(`Count is: ${readCounter()}`) }
}

//Mapping between Javascript functions and HTTP interface
function letsRunSomeExpress() {
  const express = require('express');
  const app = express();
  const PORT = 8080;

  app.get('/', (request, response) => { response.send(`
    <h1>Count is: ${readCounter()}</h1>
    <a href='/increment'>Increment</a>
    <a href='/decrement'>Decrement</a>
    <form method='GET' action='/reset'>
      <button>Reset</button>
    </form>
    <form method='GET' action='/set'>
      <input name='newCounterValue'>
      <button>Set</button>
    </form>
  `)});

  app.get('/foo/carrot');
  app.get('/foo/:vegetable'); // localhost:3000/foo/broccoli
  app.get('/foo');
  app.get('/foo/*'); // localhost:3000/foo/bar/baz/123/turnip


  app.get('/increment', (request, response) => { increment(); response.redirect('/') });
  app.get('/reset', (request, response) => { reset(); response.redirect('/') });
  app.get('/decrement', (request, response) => { decrement(); response.redirect('/') });
  app.get('/set', (request, response) => {
    const { newCounterValue } = request.query;
    // request.body -> for POST requests
    // request.params -> /foo/:vegetable (vegetable is a param)
    if (newCounterValue) setTo(newCounterValue);
    response.redirect('/')
  });

  app.get('*'); // catch any unmatched route

  app.listen(PORT, () => { console.log(`Listening on ${PORT}!`)});
}
