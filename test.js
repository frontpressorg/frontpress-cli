import test from 'ava';
import fn from './';

test('create a new project', async t => {
  const name = 'test';
  const project = await fn.new(name);

  t.is('object', typeof project, 'project is an object');
  t.is('ChildProcess', project.mkdir.constructor.name, 'command `mkdir` is an instance of `ChildProcess`');
  t.is('ChildProcess', project.touch.constructor.name, 'command `touch` is an instance of `ChildProcess`');
  t.is('ChildProcess', project.cd.constructor.name, 'command `cd` is an instance of `ChildProcess`');
  t.is('object', typeof project.mkdir.spawnargs, 'spawn args should be an object - array like');
  t.is('object', typeof project.cd.spawnargs, 'spawn args should be an object - array like');
  t.true(project.mkdir.spawnargs.indexOf(name) !== -1, 'should have the project name on spawn args');
  t.true(project.touch.spawnargs.indexOf(`${name}/index.html`) !== -1, 'should have an index.html inside the projec\'s path on spawn args');
});
