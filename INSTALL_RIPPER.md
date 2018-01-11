All soft required for install whipper (https://github.com/JoeLametta/whipper)

### @TODO
 - [ ] move to pi-ripper service as install process

### Commands

```bash

git clone -b master --single-branch https://github.com/JoeLametta/whipper.git
cd whipper

cd src
make
sudo make install
cd ..

python2 setup.py install

sudo apt-get install python-pip
sudo apt-get install python-dev libcdio-dev libiso9660-dev swig pkg-config
sudo apt-get install cdparanoia cdrdao python-gobject-2
sudo apt-get install flac
sudo apt-get install libsndfile1-dev

sudo pip install musicbrainzngs
sudo pip install mutagen
sudo pip install setuptools
sudo pip install cddb
sudo pip install pycdio==0.17
sudo pip install requests

```
