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
                // Checkout your GitHub repo
                git branch: 'main', url: 'https://github.com/Lokesh8367/react1.git'
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                // Build backend Docker image from backend/Dockerfile
                dir('backend') {
                    script {
                        // Ensure Dockerfile exists in backend/
                        if (fileExists('Dockerfile')) {
                            docker.build("${BACKEND_IMAGE}:latest")
                        } else {
                            error "Backend Dockerfile not found!"
                        }
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                // Build frontend Docker image from frontend/Dockerfile
                dir('frontend') {
                    script {
                        // Ensure Dockerfile exists in frontend/
                        if (fileExists('Dockerfile')) {
                            docker.build("${FRONTEND_IMAGE}:latest")
                        } else {
                            error "Frontend Dockerfile not found!"
                        }
                    }
                }
            }
        }

        stage('Stop & Remove Old Containers') {
            steps {
                sh """
                    docker stop ${BACKEND_CONTAINER} || true
                    docker rm ${BACKEND_CONTAINER} || true
                    docker stop ${FRONTEND_CONTAINER} || true
                    docker rm ${FRONTEND_CONTAINER} || true
                """
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
