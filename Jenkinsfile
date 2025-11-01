pipeline{
    agent any
    tools{
        nodejs "Nodejs"
    }

    environment{
        DOCKER_REGISTRY="docker.io"
        DOCKERHUB_CREDENTIALS = credentials('DOCKER_HUB_CREDENTIAL')
        VERSION = "${env.BUILD_ID ?: 'latest'}"
    }

    stages{
        stage('Install Dependencies'){
            steps{
                sh 'npm ci'
            }
        }

        stage('Build Project'){
            steps{
                sh 'npm run build'
            }
        }

        stage('Build and Push Docker Image'){
            steps{
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                sh 'docker build -t arnab2903/food-delivery-app-frontend:${VERSION} .'
                sh 'docker push arnab2903/food-delivery-app-frontend:${VERSION}'  
            }
        }

        stage('Cleanup Workspace'){
            steps{
                deleteDir()
            }
        }

        stage('Update Image Tag in GitOps') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[ credentialsId: 'git-ssh', url: 'git@github.com:arnabs-29/deployment-folder.git']])
                script {
                sh '''
                  sed -i "s/image:.*/image: arnab2903\\/food-delivery-app-frontend:${VERSION}/" aws/angular-manifest.yml
                '''
                    sh 'git checkout master'
                    sh 'git add .'
                    sh 'git commit -m "Update image tag"'
                    sshagent(['git-ssh'])
                    {
                        sh('git push')
                    }
                }
            }
        }
    }
}