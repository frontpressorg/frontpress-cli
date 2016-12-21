module.exports.replace = [{
  type: 'confirm',
  name: 'replace',
  message: 'You alredy have a project with this name. Replace project?',
  default: false
}];

module.exports.init = [{
  type: 'input',
  name: 'restApiUrl',
  message: 'WordPress API url:',
  default: 'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com'
}, {
  type: 'list',
  name: 'apiVersion',
  message: 'WordPress API version:',
  choices: ['v1', 'v2']
}, {
  type: 'confirm',
  name: 'useDiqus',
  message: 'Do you want to use Disqus on this project?',
  default: true
}, {
  when: response => response.useDiqus,
  name: 'disqusShortname',
  message: 'Nice! What\'s your Disqus shortname?'
}];
