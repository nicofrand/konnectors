// Generated by CoffeeScript 1.10.0
var api, baseOVHKonnector, connector, name, slug;

baseOVHKonnector = require('../lib/base_ovh_konnector');

name = 'Kimsufi CA';

slug = 'kimsufi_ca';

api = {
  endpoint: 'kimsufi-ca',
  appKey: '',
  appSecret: ''
};

connector = module.exports = baseOVHKonnector.createNew(api, name, slug);
