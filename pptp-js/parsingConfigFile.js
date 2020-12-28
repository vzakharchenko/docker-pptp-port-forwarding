const fs = require('fs');

const configPath = process.env['CONFIG_PATH'] || '../examples/config.json';
const secretPath = process.env['SECRET_PATH'] || 'chap-secrets';
const routesUpPath = process.env['ROUTES_UP'] || 'routesUp';
const redirPath = process.env['REDIR_SH'] || 'redir.sh';


function ifRoutesUp(userInfo) {
    if (!userInfo.routing) {
        return "";
    }
    const lines = [];
    lines.push(
        userInfo.ip+')\n');
    userInfo.routing.forEach((v) => {
        lines.push(` /sbin/ip route add ${v.route} dev  $1\n`);
    });
    lines.push(`;;\n`);
    return lines.join('\n');
}


function parseFile(cJson) {
    const ips = {};
    const ports = {};
    let secrets = '';
    let routesUp = '#!/bin/bash\n' +
        'logger "setup routing for $5" \n'+
        'case "$5" in\n';
    let redir = '';
    Object.entries(cJson).forEach((entry) => {
        const user = entry[0];
        const value = entry[1];
        if (!value.ip) {
            throw new Error(user + " does not have RemoteIp address")
        }
        if (!value.ip.startsWith('192.168.122.')) {
            throw new Error(user + " has wrong Ip address. Ip address should startWith 192.168.122")
        }
        if (!value.password) {
            throw new Error(user + " does not have password")
        }
        if (ips[value.ip]) {
            throw new Error(value.ip + " already exists. user " + ips[value.ip].user)
        }
        ips[value.ip] = {user};
        secrets = secrets + user + '    pptpd   ' + value.password + '    ' + value.ip + '\n';
        routesUp = routesUp + ifRoutesUp(value);

        if (value.forwarding){
            value.forwarding.forEach((f) => {
                if (ports[f.destinationPort]) {
                    throw new Error(f.destinationPort + " already exists. user " + ports[f.destinationPort].user)
                }
                ports[f.destinationPort] = {user};
                redir = redir + `redir -s :${f.destinationPort} ${f.sourceIp}:${f.sourcePort}\n`
            })
        }

    });
    routesUp = routesUp +
        '*)\n' +
        'esac\n' +
        'exit 0';
    fs.writeFileSync(secretPath, secrets);
    fs.writeFileSync(routesUpPath, routesUp);
    fs.writeFileSync(redirPath, redir);
}

const f = fs.readFileSync(configPath, 'utf8');

const configJson = JSON.parse(f);
parseFile(configJson.users);

