docker build -t pptp-port-forwarding .
docker tag  pptp-port-forwarding vassio/pptp-port-forwarding:1.0.1_arm64
docker push vassio/pptp-port-forwarding:1.0.1_arm64

docker tag  pptp-port-forwarding vassio/pptp-port-forwarding:latest_arm64
docker push vassio/pptp-port-forwarding:latest_arm64
