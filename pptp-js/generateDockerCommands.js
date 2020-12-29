const fs = require('fs');

const configPath = process.env['CONFIG_PATH'] || '../examples/config.json';

function parseFile(cJson) {
    const ips = {};
    const ports = {};
    let redir = '';
    Object.entries(cJson).forEach((entry) => {
        const user = entry[0];
        const value = entry[1];
        if (!value.ip) {
            throw new Error(user + " does not have RemoteIp address")
        }
        if (!value.password) {
            throw new Error(user + " does not have password")
        }
        if (ips[value.ip]) {
            throw new Error(value.ip + " already exists. user " + ips[value.ip].user)
        }
        ips[value.ip] = {user};
        if (value.forwarding) {
            value.forwarding.forEach((f) => {
                if (ports[f.destinationPort]) {
                    throw new Error(f.destinationPort + " already exists. user " + ports[f.destinationPort].user)
                }
                ports[f.destinationPort] = {user};
                redir = redir + `-p ${f.destinationPort}:${f.destinationPort} `
            })
        }
    });

    console.log('docker run -d --name=pptp-port-forwarding -p 1723:1723 ' + redir +
        `-v ${configPath}:/opt/config.json --privileged --restart=always vassio/pptp-port-forwarding:latest`)
}

const f = fs.readFileSync(configPath, 'utf8');

const configJson = JSON.parse(f);
parseFile(configJson.users);

