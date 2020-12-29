docker build -t pptp-port-forwarding .
docker tag  pptp-port-forwarding vassio/pptp-port-forwarding:1.0.1
docker push vassio/pptp-port-forwarding:1.0.1

docker tag  pptp-port-forwarding vassio/pptp-port-forwarding:latest
docker push vassio/pptp-port-forwarding:latest
