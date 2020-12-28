# Docker Image with PPTP Server with port forwarding

## Description
[GitHub Project](https://github.com/vzakharchenko/docker-pptp-port-forwarding)

## Cloud Installation
### Automatic cloud installation
```
sudo apt-get update && sudo apt-get install -y curl
curl -sSL https://raw.githubusercontent.com/vzakharchenko/docker-pptp-port-forwarding/ubuntu.install -o ubuntu.install
chmod +x ubuntu.install
./ubuntu.install
```
### Manual Cloud Installation(Ubuntu)

1. install all dependencies
```
sudo apt-get update && sudo apt-get install -y iptables git iptables-persistent node
```
2. install docker
```
sudo apt-get remove docker docker.io containerd runc
sudo curl -sSL https://get.docker.com | bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

3. Configure host machine
```
echo "nf_nat_pptp" >> /etc/modules
echo "ip_gre" >> /etc/modules
iptables -I FORWARD -p gre -j ACCEPT
sudo iptables-save > /etc/iptables/rules.v4
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.netfilter.nf_conntrack_helper=1
sudo echo "net.ipv4.ip_forward=1">/etc/sysctl.conf
sudo echo "net.netfilter.nf_conntrack_helper=1">/etc/sysctl.conf
```

4. start docker image
