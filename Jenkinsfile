pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "react-node-backend"
        FRONTEND_IMAGE = "react-node-frontend"
        BACKEND_CONTAINER = "react-node-backend-container"
        FRONTEND_CONTAINER = "react-node-frontend-container"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Lokesh8367/react1.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                dir('backend') {
                    script {
                        docker.build("${BACKEND_IMAGE}:latest")
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        docker.build("${FRONTEND_IMAGE}:latest")
                    }
                }
            }
        }

        stage('Stop & Remove Old Containers') {
            steps {
                sh "docker stop ${BACKEND_CONTAINER} || true"
                sh "docker rm ${BACKEND_CONTAINER} || true"
                sh "docker stop ${FRONTEND_CONTAINER} || true"
                sh "docker rm ${FRONTEND_CONTAINER} || true"
            }
        }

        stage('Run Backend Container') {
            steps {
                sh "docker run -d --name ${BACKEND_CONTAINER} -p 5000:5000 ${BACKEND_IMAGE}:latest"
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh "docker run -d --name ${FRONTEND_CONTAINER} -p 3000:3000 ${FRONTEND_IMAGE}:latest"
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
