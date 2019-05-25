#!/bin/bash
#mongo ds249798.mlab.com:49798/elss -u <dbuser> -p <dbpassword>

#1. Set up the REST server to multi user mode 	true | false

export COMPOSER_MULTIUSER=true

#2. Set the Datasource 
export COMPOSER_DATASOURCES='{
	"db": {
		"name": "db",


		"host": "ds249798.mlab.com",
		"port": 49798,

		"database": "elss",

		"user": "admin",
		"password": "admin1!",

		"connector": "mongodb"
	}
}'

./rs-auth-github.sh

