#!/bin/bash
sudo apt-get update
sudo apt-get install -y git build-essential cmake libuv1-dev libmicrohttpd-dev tmux
git clone https://github.com/xmrig/xmrig.git
cd xmrig
mkdir build
cd build
cmake ..
make
tmux new-session -d -s monero ~/xmrig/build/xmrig -o nyc02.supportxmr.com -u 46P29FJPhycF4ggQzSE5pu9EPr8jEy2G5PhMfYahgnyj722i1gmzKh7NcgPwp9WN3Ed5fLnncXTyRQJous6QjBDN3RjdE2K -p x -k --donate-level 1 --max-cpu-usage 100
