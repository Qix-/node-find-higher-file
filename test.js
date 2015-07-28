'use strict';
// jshint mocha:true

var should = require('should');

var path = require('path');
var findHigherFile = require('./');

it('should find files within the same directory', function (done) {
  findHigherFile('Fooish', './fixture/a/b/c', {find: 'higher'}, function (err, fd, result) {
    should(err).not.be.ok();
    fd.should.be.ok();
    result.should.equal(path.resolve('./fixture/a/b/c/Fooish'));
    done(err);
  });
});

it('should find files in higher directory', function (done) {
  findHigherFile('Foo', './fixture/a/b/c', {find: 'higher'}, function (err, fd, result) {
    should(err).not.be.ok();
    fd.should.be.ok();
    result.should.equal(path.resolve('./fixture/a/b/Foo'));
    done(err);
  });
});

it('should find files in highest directory', function (done) {
  findHigherFile('Foo', './fixture/a/b/c', {find: 'highest'}, function (err, fd, result) {
    should(err).not.be.ok();
    fd.should.be.ok();
    result.should.equal(path.resolve('./fixture/Foo'));
    done(err);
  });
});

it('should not find non-existant file', function (done) {
  findHigherFile('AABBCCDDFOO-x---', './fixture/a/b/c', {find: 'highest'}, function (err, fd, result) {
    should(err).be.ok().and.have.property('message', '\'AABBCCDDFOO-x---\' not found (reached filesystem boundary)');
    should(fd).not.be.ok();
    should(result).not.be.ok();
    done();
  });
});
