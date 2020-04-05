#!/bin/bash
#copy over ssh keys from secrets
#bootstrap editors with aws c9: theia, c9-core, code-server
#devtools
sudo apt-get install -y git curl silversearcher-ag
#heroku toolbelt, replace with snap?
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
#snap install dotnet, go
#upgrade to latest node
sudo npm install -g n && sudo n stable
#install npm
sudo npm install -g npm
#install tools
sudo npm install -g npm-check-updates
#docker
curl -sSL https://get.docker.com/ | sh
curl -L "https://github.com/docker/compose/releases/download/1.17.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose

