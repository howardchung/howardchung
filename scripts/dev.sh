#update packages
sudo apt-get update && sudo apt-get upgrade -y
#node required for c9
sudo apt-get install nodejs-legacy npm
#c9
wget -O - https://raw.githubusercontent.com/c9/install/master/install.sh | bash
#devtools
sudo apt-get install -y git vim curl silversearcher-ag
#heroku toolbelt
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
#upgrade to latest node
sudo npm install -g n && sudo n stable
#install npm
sudo npm install -g npm
#install tools
sudo npm install -g pm2 c9
#make a new ssh key
ssh-keygen -t rsa -C "howardzchung@gmail.com"
