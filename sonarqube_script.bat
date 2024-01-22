@echo off
set SCANNER_HOME=%1
set PROJECT_KEY=%2
%SCANNER_HOME%\bin\sonar-scanner -Dsonar.login=%SONARQUBE_CREDENTIALS% -Dsonar.projectKey=%PROJECT_KEY%
@REM %SCANNER_HOME%\bin\sonar-scanner.bat -D"sonar.projectKey=Reactjs" -D"sonar.sources=." -D"sonar.host.url=${SONARQUBE_SERVER}" -D"sonar.token=sqp_7cc24242be902c251b7796c4512b1620da638125"
%SCANNER_HOME%\bin\sonar-scanner.bat -D"sonar.projectKey=Reactjs" -D"sonar.sources=." -D"sonar.host.url=${SONARQUBE_SERVER}" -D"sonar.token=${SCAN_TOKEN}"