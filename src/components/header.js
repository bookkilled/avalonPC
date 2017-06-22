var header = require('./header.html');

avalon.component('ms-header', {
    template: header,
    defaults: {
        title:'modal'
    },
    soleSlot: 'content'
});