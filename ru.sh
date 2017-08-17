docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
export BACKEND_PROD_EXTERNAL_DNS_NAME_OR_IP=$(curl ipinfo.io/ip)
docker-compose up -d --force-recreate