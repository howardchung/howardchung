sudo apt-get update
sudo apt-get install -y nginx
cp ./sites-available/* /etc/nginx/sites-available
cp ./sites-available/* /etc/nginx/sites-enabled