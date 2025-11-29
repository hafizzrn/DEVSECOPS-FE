pipeline {
    agent any

    environment {
        REPO_URL = 'https://github.com/hafizzrn/DEVSECOPS-FE'
        BRANCH = 'main'
        IMAGE_NAME = 'secure-cashflow-fe'
        IMAGE_TAG = "${env.BUILD_NUMBER}"

        SONARQUBE_HOST = 'http://sonarqube:9000'
        SONARQUBE_TOKEN = credentials('sonarqube-token')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", url: "${REPO_URL}"
            }
        }

        stage('Build & Test') {
            steps {
                sh '''
                    npm ci
                    npm run build
                    npm test -- --coverage --watchAll=false || true
                '''
            }
        }

        stage('SAST - SonarQube') {
            steps {
                script {
                    sh '''
                        sonar-scanner \\
                          -Dsonar.projectKey=secure-cashflow-fe \\
                          -Dsonar.sources=src,pages,components \\
                          -Dsonar.host.url=${SONARQUBE_HOST} \\
                          -Dsonar.login=${SONARQUBE_TOKEN} \\
                          -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                    '''

                    timeout(time: 5, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            unstable("SAST failed")
                            error("SAST failed")
                        }
                    }
                }
            }
        }

        stage('Dependency Audit') {
            steps {
                sh '''
                    npm audit --audit-level=high --json > npm-audit.json || true
                    npm audit --audit-level=high || echo "Vulnerabilities found"
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${IMAGE_TAG} \\
                      -f Dockerfile.prod .
                    docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Container Scan - Trivy') {
            steps {
                sh '''
                    trivy image --severity HIGH,CRITICAL \\
                      --format json \\
                      --output trivy-report.json \\
                      ${IMAGE_NAME}:${IMAGE_TAG}

                    trivy image --severity HIGH,CRITICAL \\
                      --exit-code 1 \\
                      ${IMAGE_NAME}:${IMAGE_TAG} || echo "CVEs found"
                '''

                script {
                    def report = readJSON file: 'trivy-report.json'
                    def hasCritical = report.Results?.any { result ->
                        result.Vulnerabilities?.any { vuln ->
                            vuln.Severity in ['HIGH', 'CRITICAL']
                        }
                    }
                    if (hasCritical) {
                        unstable("HIGH/CRITICAL CVEs detected")
                        error("HIGH/CRITICAL CVEs detected")
                    }
                }
            }
        }

        // stage('Deploy to Staging') {
        //     steps {
        //         sh '''
        //             docker stop secure-cashflow-staging || true
        //             docker rm secure-cashflow-staging || true

        //             docker run -d \\
        //               --name secure-cashflow-staging \\
        //               --network staging-net \\
        //               -p 3000:3000 \\
        //               ${IMAGE_NAME}:${IMAGE_TAG}

        //             # Nginx frontend proxy (minimal config)
        //             docker stop nginx-secure-cashflow || true
        //             docker rm nginx-secure-cashflow || true

        //             docker run -d \\
        //               --name nginx-secure-cashflow \\
        //               --network staging-net \\
        //               -p 80:80 \\
        //               -v $(pwd)/nginx-secure-cashflow.conf:/etc/nginx/nginx.conf:ro \\
        //               nginx:alpine

        //             sleep 15
        //             curl -f ${STAGING_URL} || exit 1
        //         '''
        //     }
        // }

        // stage('DAST - OWASP ZAP') {
        //     steps {
        //         sh '''
        //             docker run --rm \\
        //               --network staging-net \\
        //               -v $(pwd):/zap/wrk:rw \\
        //               owasp/zap2docker-stable zap-baseline.py \\
        //               -t ${STAGING_URL} \\
        //               -r zap-report.html \\
        //               -J zap-report.json \\
        //               -I || true

        //             if [ -f zap-report.json ]; then
        //                 HIGH_COUNT=$(jq '[.site[].alerts[] | select(.riskcode == "3" or .riskcode == "4")] | length' zap-report.json)
        //                 if [ "$HIGH_COUNT" -gt "0" ]; then
        //                     echo "Expected: XSS, missing security headers, clickjacking"
        //                     exit 1
        //                 fi
        //             fi
        //         '''
        //     }
        // }

        stage('Archive Reports') {
            steps {
                archiveArtifacts artifacts: 'trivy-report.json,zap-report.html,zap-report.json,npm-audit.json', allowEmptyArchive: true

                publishHTML([
                    reportDir: '.',
                    reportFiles: 'zap-report.html',
                    reportName: 'ZAP Scan Report'
                ])
            }
        }


    }

    post {
        always {
            cleanWs()
        }
    }
}
