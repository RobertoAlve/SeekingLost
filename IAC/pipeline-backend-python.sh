# dar acesso aos arquivos e pastas 
chmod -R 777 ./model_api

# ir até pasta do projeto da API
cd ./model_api

# criar imagem
sudo -S docker build -t seeking_lost_api_python .

# salvar imagem
sudo -S docker save seeking_lost_api_python > seeking_lost_api_python.tar

# remove imagens geradas
sudo -S docker system prune -f

# enviar imagem
scp -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" seeking_lost_api_python.tar ubuntu@ec2-34-233-84-117.compute-1.amazonaws.com:/home/ubuntu && ls -l

usuario="ubuntu"
host="34.233.84.117"

# Comando para carregar a imagem Docker
comando_load="sudo docker load -i seeking_lost_api_python.tar"

# Comando para parar o contêiner Docker
comando_stop="sudo docker stop seeking_lost_api_python-api"

# Comando para parar o contêiner Docker
comando_rm="sudo docker rm seeking_lost_api_python-api"

# Comando para executar o contêiner Docker
comando_run="sudo docker run --restart=always --name seeking_lost_api_python-api -d -p 5000:5000 seeking_lost_api_python:latest"

# Comando para limpar o docker
comando_clear="sudo docker system prune -f"

# Execute os comandos SSH
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_load"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_stop || true; $comando_rm || true; $comando_run || true"
ssh -o StrictHostKeyChecking=no -i "/home/ec2-user/key-front-back.pem" $usuario@$host "$comando_clear"