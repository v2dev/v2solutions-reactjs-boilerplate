@echo off

set build_number=%1

docker tag reactjs:%build_number% v2devops/v2solutions-reactjs-boilerplate:%build_number%
docker push v2devops/v2solutions-reactjs-boilerplate:%build_number%