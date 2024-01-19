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

        // stage('Print') {
        //     steps {
        //         bat '@echo off'
        //         bat 'echo %WORKSPACE%'
        //         dir("DevOpsScripts") {
        //             bat './print_script.bat'
        //         }
        //         // script {
        //         //     echo "Environment Variables:"
        //         //     sh "printenv"
        //         //     echo "Current working directory: ${pwd()}"
        //         // }
        //     }   
        // }

        stage('SonarQube Scan') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner'
                    def projectKey = "Reactjs"
                    withSonarQubeEnv(SONARQUBE_SERVER) {
                        // bat '@echo off'
                        // bat 'echo %WORKSPACE%'
                        dir("DevOpsScripts") {
                            bat "./sonarqube_script.bat ${scannerHome} ${projectKey}"
                        }
                        // sh "\"${scannerHome}/bin/sonar-scanner\" -Dsonar.login=${SONARQUBE_CREDENTIALS}"
                        // sh "${scannerHome}/bin/sonar-scanner -Dsonar.login=${SONARQUBE_CREDENTIALS}"
                        // bat "${scannerHome}/bin/sonar-scanner.bat -D\"sonar.projectKey=Reactjs\" -D\"sonar.sources=.\" -D\"sonar.host.url=${SONARQUBE_SERVER}\" -D\"sonar.login=sqp_7cc24242be902c251b7796c4512b1620da638125\""
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