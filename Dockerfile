FROM ubuntu:latest
MAINTAINER Vasyl Zakharchenko <vaszakharchenko@gmail.com>
LABEL author="Vasyl Zakharchenko"
LABEL email="vaszakharchenko@gmail.com"
LABEL name="docker-pptp-port-forwarding"
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y cron ppp pptpd iptables rsyslog iproute2 redir net-tools inetutils-inetd git iptables-persistent systemd nodejs
RUN echo "net.ipv4.ip_forward=1">/etc/sysctl.conf
RUN echo "net.ipv4.ip_forward=1">/etc/sysctl.conf
COPY ./etc/iptables/rules.v4 /etc/iptables/rules.v4
COPY ./etc/rsyslog.conf /etc/rsyslog.conf
COPY ./etc/rsyslog.d/50-default.conf /etc/rsyslog.d/50-default.conf
COPY ./etc/pptpd.conf /etc/pptpd.conf
COPY ./etc/ppp/pptpd-options /etc/ppp/pptpd-options
COPY ./pptp-js/parsingConfigFile.js /opt/parsingConfigFile.js
RUN chmod 777 /etc/iptables/rules.v4
COPY entrypoint.sh /entrypoint.sh
RUN  chmod +x /entrypoint.sh
ENV CONFIG_PATH  /opt/config.json
ENV SECRET_PATH  /etc/ppp/chap-secrets
ENV ROUTES_UP  /etc/ppp/ip-up.d/routes-up
ENV REDIR_SH  /opt/redir.sh
RUN  node /opt/parsingConfigFile.js
RUN  chmod +x /opt/redir.sh
RUN  chmod +x /etc/ppp/ip-up.d/routes-up
EXPOSE 1723
ENTRYPOINT ["/entrypoint.sh"]
