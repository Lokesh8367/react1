pipeline {
    agent any

    environment {
        BACKEND_IMAGE = "node-api"
        FRONTEND_IMAGE = "react-app"
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
                        if (fileExists('Dockerfile')) {
                            sh 'docker build -t $BACKEND_IMAGE .'
                        } else {
                            error "Backend Dockerfile not found!"
                        }
                    }
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                dir('frontend') {
                    script {
                        if (fileExists('Dockerfile')) {
                            sh 'docker build -t $FRONTEND_IMAGE .'
                        } else {
                            error "Frontend Dockerfile not found!"
                        }
                    }
                }
            }
        }

        stage('Run Containers') {
            steps {
                script {
                    // stop & remove old ones if exist
                    sh 'docker stop backend || true && docker rm backend || true'
                    sh 'docker stop frontend || true && docker rm frontend || true'

                    // run backend
                    sh 'docker run -d --name backend -p 5000:5000 $BACKEND_IMAGE'

                    // run frontend
                    sh 'docker run -d --name frontend -p 3000:3000 $FRONTEND_IMAGE'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed!"
        }
    }
}
