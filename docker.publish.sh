dockebuild -t docker-pptp-port-forwarding .
docker tag  docker-pptp-port-forwarding vassio/docker-pptp-port-forwarding:1.0.0
docker push vassio/docker-pptp-port-forwarding:1.0.0

docker tag  docker-pptp-port-forwarding vassio/docker-pptp-port-forwarding:latest
docker push vassio/docker-pptp-port-forwarding:latest
