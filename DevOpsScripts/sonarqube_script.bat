@echo off
set SCANNER_HOME=%1
%SCANNER_HOME%\bin\sonar-scanner -Dsonar.login=%SONARQUBE_CREDENTIALS%
%SCANNER_HOME%\bin\sonar-scanner.bat -D"sonar.projectKey=Reactjs" -D"sonar.sources=." -D"sonar.host.url=${SONARQUBE_SERVER}" -D"sonar.login=sqp_7cc24242be902c251b7796c4512b1620da638125"