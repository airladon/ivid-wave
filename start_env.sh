CMD=''
PROJECT_PATH=`pwd`

cp containers/figureone/Dockerfile Dockerfile
docker build -t ivid-wave_dev .
rm Dockerfile

docker run -it --rm \
  -v $PROJECT_PATH/src:/opt/app/src \
  -v $PROJECT_PATH/assets:/opt/app/assets \
  -v $PROJECT_PATH/docs:/opt/app/docs \
  -v $PROJECT_PATH/figureone.worker.js:/opt/app/figureone.worker.js \
  -v $PROJECT_PATH/figureone.worker.js.map:/opt/app/figureone.worker.js.map \
  -v $PROJECT_PATH/index.html:/opt/app/index.html \
  -v $PROJECT_PATH/index.js:/opt/app/index.js \
  # -v $PROJECT_PATH/favicon.ico:/opt/app/favicon.ico \
  -v $PROJECT_PATH/index.js.map:/opt/app/index.js.map \
  -v $PROJECT_PATH/containers/figureone/browser.sh:/opt/app/browser.sh \
  -v $PROJECT_PATH/.dockerignore:/opt/app/.dockerignore \
  -v $PROJECT_PATH/readme.md:/opt/app/readme.md \
  -v $PROJECT_PATH/containers:/opt/app/containers \
  -v $PROJECT_PATH/containers/figureone/favicon.ico:/opt/app/favicon.ico \
  -v $PROJECT_PATH/figureone0.10.0:/opt/app/figureone0.10.0 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -e LOCAL_PROJECT_PATH=$PROJECT_PATH \
  -p 8080:8080 \
  --name ivid-wave_dev \
  ivid-wave_dev $CMD
