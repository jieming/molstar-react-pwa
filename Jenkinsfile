@Library('exs-jenkins-libs')_

master_account = "${AwsAccount.MASTER}"
dev_account = "${AwsAccount.ENGINEERING_DEV}"
ecr_account = "${AwsAccount.ECR}"

appVersion = ""

pipeline {
    agent {
        node {
            label 'docker'
        }
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        NPM_CREDS = credentials('msft-exs-npm')
        NPM_USER = "$NPM_CREDS_USR"
        NPM_TOKEN = "$NPM_CREDS_PSW"
    }

    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            agent {
                docker {
                    image "node:14"
                    reuseNode true
                }
            }
            steps {
                sh 'npm install'
                sh 'npm run test-ci'
            }
        }

        stage("Version") {
            when { branch "master" }
            agent {
                docker {
                    image "node:14"
                    reuseNode true
                }
            }
            steps {
                script {
                    appVersion = versionJsPackage()
                }
            }
        }

        stage('Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    dockerImage('centaur-myapp-ui', '.', [
                        registry: "https://${ecr_account}.dkr.ecr.eu-west-1.amazonaws.com",
                        buildOptions: "--build-arg NPM_USER=${NPM_USER} --build-arg  NPM_TOKEN=${NPM_TOKEN}",
                        tags: [appVersion]
                    ])
                }
            }
        }

        stage("Trigger Deployment") {
            when { branch "master" }
            steps {
                build(
                    job: "k8s-deploy", propagate: false, wait: false,
                    parameters: [
                        string(name: "REPO", value: env.GIT_URL ),
                        string(name: "KUSTOMIZE_PATH_DEV", value: "deployment/k8s/hosted/dev.image"),
                        string(name: "KUSTOMIZE_PATH_STAGING", value: "deployment/k8s/hosted/staging.image"),
                        string(name: "KUSTOMIZE_PATH_PROD", value: "deployment/k8s/hosted/prod.image"),
                        booleanParam(name: "PRUNE", value: false)
                    ],

                )
            }
        }
    }

    post {
        always {
            junit 'test-output/coverage/junit/jest-coverage.xml'
            script { collectCoverage 'test-output/coverage/jest/clover.xml' }
            script { slackNotify currentBuild }
            publishHTML target: [
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'test-output/coverage/jest/lcov-report',
                    reportFiles: 'index.html',
                    reportName: 'Frontend Units Coverage'
            ]
        }
    }
}
