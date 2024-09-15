#!/bin/bash

cd /home/ec2-user/
sudo chmod 777 package.json

# who > user.txt
# su ec2-user
sudo yum install -y nodejs npm
npm i
sudo npx prisma migrate dev --schema src/prisma/schema.prisma

npm run build

PID=$(sudo lsof -i :3000 -t)
if [ -n "$PID" ]; then
    sudo kill "$PID"
else
    echo "ポート 3000 でリッスンしているプロセスはありません。"
fi

npm start & 