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
sudo npm install -g pm2 c9 npm-check-updates
#install golang
sudo curl -O https://storage.googleapis.com/golang/go1.9.linux-amd64.tar.gz
sudo tar -xvf go1.9.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo mv go /usr/local
echo "export PATH=$PATH:/usr/local/go/bin" >> ~/.bashrc
echo "export GOPATH=$HOME" >> ~/.bashrc
source ~/.bashrc
#make a new ssh key
ssh-keygen -t rsa -C "howardzchung@gmail.com"
