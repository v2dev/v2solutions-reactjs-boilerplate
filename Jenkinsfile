pipeline{
    agent any
    options {
        skipDefaultCheckout(true)
    }

    environment {
        SONARQUBE_CREDENTIALS = credentials('sonar-cred')
        SONARQUBE_SERVER = 'sonarconfig'
    }

    stages{
        stage("Initialise"){
            steps{
                cleanWs()
            }
        }
        stage("git"){
            steps{
                git branch: 'Chandrashekar_main', url: 'https://github.com/v2dev/v2solutions-reactjs-boilerplate.git'
            }
        }

        stage('SonarQube Scan') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    withSonarQubeEnv("${SONARQUBE_SERVER}") {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.login=${SONARQUBE_CREDENTIALS}"
                        bat "${scannerHome}/bin/sonar-scanner.bat -D\"sonar.projectKey=Reactjs\" -D\"sonar.sources=.\" -D\"sonar.host.url=${SONARQUBE_SERVER}\" -D\"sonar.token=sqp_eb82b5ae9fdfc5e5c38b75e5e0d808c76c87fbd9\""
                    }
                }
            }
        }

        stage("build"){
            steps{
                bat '@echo off'
                bat 'echo %WORKSPACE%'
                dir("DevOpsScripts") {
                    bat './build_script.bat %BUILD_NUMBER%'
                }
            }
        }
        stage("push"){
            steps{
                withDockerRegistry(credentialsId: 'docker', toolName: 'docker'){
                    bat '@echo off'
                    bat 'echo %WORKSPACE%'
                    dir("DevOpsScripts") {
                        bat './push_script.bat %BUILD_NUMBER%'
                    }
                }
            }
        }
    }
}