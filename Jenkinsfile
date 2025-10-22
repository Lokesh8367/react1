pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "react-node-docker-app"
        DOCKER_CONTAINER_NAME = "react-node-container"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lokesh8367/react1.git'
            }
        }

        stage('Unzip Source Code') {
            steps {
                sh '''
                    if ! command -v unzip &> /dev/null
                    then
                        echo "unzip not found — installing..."
                        apt-get update && apt-get install -y unzip
                    fi
                    unzip -o react-node-docker-app.zip -d app
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('app/react-node-docker-app') {
                    script {
                        docker.build("${DOCKER_IMAGE_NAME}:latest")
                    }
                }
            }
        }

        stage('Stop & Remove Old Container') {
            steps {
                script {
                    sh "docker stop ${DOCKER_CONTAINER_NAME} || true"
                    sh "docker rm ${DOCKER_CONTAINER_NAME} || true"
                }
            }
        }

        stage('Run Docker Container') {
            steps {
                script {
                    sh "docker run -d --name ${DOCKER_CONTAINER_NAME} -p 3000:3000 ${DOCKER_IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
        }
    }
}
