var Moninode = require('../../moninode');



exports['test moninode basic'] = function(assert, done) {
 var m = new Moninode();
 var start = new Date().getTime();
 m.start( { interval: 1100} );
 m.on("log", function( data)
 {
    var end = new Date().getTime();
    assert.equal( true, (end-start) > 1000 && (end-start) < 2000 , 'running time')
    m.stop();
    assert.equal(m.interval, null, 'interval online');
    done();
 })
}
 
if (module == require.main) require('test').run(exports)