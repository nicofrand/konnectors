// Generated by CoffeeScript 1.10.0
var api, baseOVHKonnector, connector, name, slug;

baseOVHKonnector = require('../lib/base_ovh_konnector');

name = 'Kimsufi EU';

slug = 'kimsufi_eu';

api = {
  endpoint: 'kimsufi-eu',
  appKey: '',
  appSecret: ''
};

connector = module.exports = baseOVHKonnector.createNew(api, name, slug);
