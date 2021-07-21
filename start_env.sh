CMD=''
PROJECT_PATH=`pwd`

cp containers/figureone/Dockerfile Dockerfile
docker build -t ivid-wave_dev .
rm Dockerfile

docker run -it --rm \
  -v $PROJECT_PATH/src:/opt/app/src \
  -v $PROJECT_PATH/containers/figureone/browser.sh:/opt/app/browser.sh \
  -v $PROJECT_PATH/.dockerignore:/opt/app/.dockerignore \
  -v $PROJECT_PATH/readme.md:/opt/app/readme.md \
  -v $PROJECT_PATH/containers:/opt/app/containers \
  -v $PROJECT_PATH/containers/figureone/favicon.ico:/opt/app/favicon.ico \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e LOCAL_PROJECT_PATH=$PROJECT_PATH \
  -p 8080:8080 \
  --name ivid-wave_dev \
  ivid-wave_dev $CMD
