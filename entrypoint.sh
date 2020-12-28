#!/bin/sh

set -e
service rsyslog restart
iptables-restore < /etc/iptables/rules.v4
service pptpd restart
/opt/redir.sh
tail -f /var/log/messages
