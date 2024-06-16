# dar acesso aos arquivos e pastas 
chmod -R 777 ./SeekingLostAPI

# ir até pasta do projeto da API
cd ./SeekingLostAPI

# executar clean install
./mvnw clean install

# criar imagem
sudo -S docker build -t seeking_lost_api .

# salvar imagem
sudo -S docker save seeking_lost_api > seeking_lost_api.tar

# remove imagens geradas
sudo -S docker system prune -f

# enviar imagem
scp -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" seeking_lost_api.tar ubuntu@ec2-34-233-84-117.compute-1.amazonaws.com:/home/ubuntu && ls -l

usuario="ubuntu"
host="34.233.84.117"

# Comando para carregar a imagem Docker
comando_load="sudo docker load -i seeking_lost_api.tar"

# Comando para parar o contêiner Docker
comando_stop="sudo docker stop seekinglost-api"

# Comando para remover o contêiner Docker
comando_rm="sudo docker rm seekinglost-api"

# Comando para executar o contêiner Docker
comando_run="sudo docker run --restart=always --name seekinglost-api -d -e 'USE_CREDENTIALS=false' -p 8080:8080 seeking_lost_api:latest"

# Comando para limpar o docker
comando_clear="sudo docker system prune -f"

# Execute os comandos SSH
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_load"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_stop || true; $comando_rm || true; $comando_run || true"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_clear"