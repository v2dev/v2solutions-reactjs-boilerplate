@echo off

set build_number=%1
docker build --tag reactjs:%build_number%