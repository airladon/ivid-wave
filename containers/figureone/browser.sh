PROJECT_PATH=`pwd`

# cp containers/playwright/.dockerignore .

cp containers/playwright/Dockerfile Dockerfile
docker build -t playwright .
rm Dockerfile

if [ "$1" == "debug" ];
then
  docker run -it --rm --ipc=host \
  -v $LOCAL_PROJECT_PATH/src:/src \
  -v $LOCAL_PROJECT_PATH/assets:/assets \
  -v $LOCAL_PROJECT_PATH/test:/test \
  -v $LOCAL_PROJECT_PATH/index.html:/index.html \
  -v $LOCAL_PROJECT_PATH/containers/figureone/browser.sh:/browser.sh \
  -v $LOCAL_PROJECT_PATH/.dockerignore:/.dockerignore \
  -v $LOCAL_PROJECT_PATH/readme.md:/readme.md \
  -v $LOCAL_PROJECT_PATH/containers:/containers \
  -v $LOCAL_PROJECT_PATH/containers/figureone/favicon.ico:/favicon.ico \
  -v $LOCAL_PROJECT_PATH/containers/playwright/jest.config.js:/jest.config.js \
    playwright /bin/bash
else
  docker run -it --rm --ipc=host \
  -v $LOCAL_PROJECT_PATH/src:/src \
  -v $LOCAL_PROJECT_PATH/assets:/assets \
  -v $LOCAL_PROJECT_PATH/test:/test \
  -v $LOCAL_PROJECT_PATH/index.html:/index.html \
  -v $LOCAL_PROJECT_PATH/containers/figureone/browser.sh:/browser.sh \
  -v $LOCAL_PROJECT_PATH/.dockerignore:/.dockerignore \
  -v $LOCAL_PROJECT_PATH/readme.md:/readme.md \
  -v $LOCAL_PROJECT_PATH/containers:/containers \
  -v $LOCAL_PROJECT_PATH/containers/figureone/favicon.ico:/favicon.ico \
  -v $LOCAL_PROJECT_PATH/src:/src \
  -v $LOCAL_PROJECT_PATH/test:/test \
  -v $LOCAL_PROJECT_PATH/containers/playwright/jest.config.js:/jest.config.js \
    playwright /bin/bash -c "npm run http-server-quiet; npm run jest $1 $2 $3 $4 $5 $6"
fi
