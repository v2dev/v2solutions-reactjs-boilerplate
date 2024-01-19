@echo off
set SCANNER_HOME=%1
%SCANNER_HOME%\bin\sonar-scanner -Dsonar.login=%SONARQUBE_CREDENTIALS%