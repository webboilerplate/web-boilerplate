casper.test.begin('Sample Casper Test', function(test) {

  casper.start('http://localhost:3000/', function() {

    test.assertHttpStatus(200);
    test.assertExists('body');

  }).run(function() {
    test.done();
  });
});
