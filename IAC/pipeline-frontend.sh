# dar acesso aos arquivos e pastas 
chmod -R 777 ./SeekingLost

# ir até pasta do projeto da API
cd ./SeekingLost

# criar imagem
sudo -S docker build -t seeking_lost_ui .

# salvar imagem
sudo -S docker save seeking_lost_ui > seeking_lost_ui.tar

# remove imagens geradas
sudo -S docker system prune -f

# enviar imagem
scp -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" seeking_lost_ui.tar ubuntu@ec2-52-44-122-122.compute-1.amazonaws.com:/home/ubuntu && ls -l

usuario="ubuntu"
host="52.44.122.122"

# Comando para carregar a imagem Docker
comando_load="sudo docker load -i seeking_lost_ui.tar"

# Comando para parar o contêiner Docker
comando_stop="sudo docker stop seekinglost-ui"

# Comando para parar o contêiner Docker
comando_rm="sudo docker rm seekinglost-ui"

# Comando para executar o contêiner Docker
comando_run="sudo docker run --restart=always --name seekinglost-ui -d -p 80:80 seeking_lost_ui:latest"

# Comando para limpar o docker
comando_clear="sudo docker system prune -f"

# Execute os comandos SSH
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_load"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_stop || true; $comando_rm || true; $comando_run || true"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_clear"