# hondana

[![Build Status](https://travis-ci.org/SombreroElGringo/hondana.svg?branch=develop)](https://travis-ci.org/SombreroElGringo/hondana)
[![CodeFactor](https://www.codefactor.io/repository/github/sombreroelgringo/hondana/badge)](https://www.codefactor.io/repository/github/sombreroelgringo/hondana)
[![codecov](https://codecov.io/gh/SombreroElGringo/hondana/branch/develop/graph/badge.svg)](https://codecov.io/gh/SombreroElGringo/hondana)

Hondana is a project to popularize street libraries on the web. 📚

## Install

You need to download, fork or clone the project.

### Server

Create an `.env` file in the server directory. Fill in the environment variables in the file based on the file `.env.template`

```bash
$ cd server
$ npm i
$ npm start
```

### Seeds

#### Export your data

```bash
$ cd server
$ sh .mongodb/export_collections.sh DB_NAME
```

#### Import your data

```bash
$ cd server
$ sh .mongodb/import_collections.sh DB_NAME
```

### Swagger

Once the server is running, connect to the following address to access the `swagger`: 
[http://localhost:PORT/api/v1/docs](http://localhost:PORT/api/v1/docs)
