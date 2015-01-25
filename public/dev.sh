sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y make g++ nodejs-legacy git redis-server mongodb npm maven default-jdk vim
sudo ssh-keygen -t rsa -C "howardc93@gmail.com"
sudo wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh
sudo gem install travis
npm install -g mocha npm-check-updates