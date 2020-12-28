#!/bin/sh

set -e
service rsyslog restart
iptables-restore < /etc/iptables/rules.v4
node /opt/parsingConfigFile.js
chmod +x /opt/redir.sh
chmod +x /etc/ppp/ip-up.d/routes-up
service pptpd restart
/opt/redir.sh
tail -f /var/log/messages
