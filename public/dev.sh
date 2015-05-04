sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get install nodejs-legacy
#c9
wget -O - https://raw.githubusercontent.com/c9/install/master/install.sh | bash
#devtools
sudo apt-get install -y git vim curl multitail silversearcher-ag
#heroku toolbelt
wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
#upgrade to node 0.12
sudo npm install -g n && sudo n stable
#install npm, mocha, npm-check-updates
sudo npm install -g npm && sudo npm install -g mocha && sudo npm install -g npm-check-updates
#make a new ssh key
ssh-keygen -t rsa -C "howardc93@gmail.com"
