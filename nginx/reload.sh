#!/bin/bash
cp ./sites-available/* /etc/nginx/sites-available
cp ./sites-available/* /etc/nginx/sites-enabled
sudo service nginx restart