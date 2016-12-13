import test from 'ava';
import fn from './';

test('create a new project', t => {
  const name = 'test';
  const project = fn.new(name);

  t.is('object', typeof project, 'project is an object');
  t.is('ChildProcess', project.constructor.name, 'project is an instance of `ChildProcess`');
  t.is('object', typeof project.spawnargs, 'spawn args should be an object - array like');
  t.true(project.spawnargs.indexOf(name) !== -1, 'should have the project name on spawn args');
});
