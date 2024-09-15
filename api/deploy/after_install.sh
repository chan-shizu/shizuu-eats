#!/bin/bash

cd /home/ec2-user/
sudo chmod 777 package.json >& /home/ec2-user/stderr1.log

# who > user.txt
# su ec2-user
sudo yum install -y nodejs npm  >& /home/ec2-user/stderr2.log
npm i >& /home/ec2-user/stderr3.log

npm run build >& /home/ec2-user/stderr4.log

PID=$(sudo lsof -i :3000 -t)
echo "$PID" > PID.txt
if [ -n "$PID" ]; then
    touch "has_PID.txt"
    sudo kill "$PID" >& /home/ec2-user/stderr5.log
else
    touch "not_has_PID.txt"
    echo "ポート 3000 でリッスンしているプロセスはありません。" >& /home/ec2-user/stderr6.log
fi

npm start &  >& /home/ec2-user/stderr7.log