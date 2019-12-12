pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'npm install'
      }
    }

    stage('Testing') {
      parallel {
        stage('Testing routes') {
          steps {
            sh './scripts/test/testingRoutes.sh'
          }
        }

        stage('Testing credentials services') {
          steps {
            sh './scripts/test/testingCredentials.sh'
          }
        }

        stage('Unit Testing') {
          steps {
            sh './scripts/test/testingUnits.sh'
          }
        }

        stage('End-to-End Testing') {
          steps {
            sh './scripts/test/endToEndTesting.sh'
          }
        }

        stage('Testing Integration') {
          steps {
            sh './scripts/test/testingIntegration.sh'
          }
        }

      }
    }

    stage('Security') {
      parallel {
        stage('Dependencies Analysis') {
          steps {
            sh './scripts/security/dependenciesAnalysis.sh'
          }
        }

        stage('Encripted DataBase') {
          steps {
            sh './scripts/security/testingEncryption.sh'
          }
        }

      }
    }

    stage('Static Code Analysis') {
      steps {
        sh './scripts/analysis/testingCode.sh'
      }
    }

    stage('Compatibility') {
      parallel {
        stage('Compatibility with Browser') {
          steps {
            sh './scripts/compatibility/compatibilityBrowser.sh'
          }
        }

        stage('Compatibility with Mobile') {
          steps {
            sh './scripts/compatibility/compatibilityMobile.sh'
          }
        }

        stage('Compatibility with Desktop') {
          steps {
            sh './scripts/compatibility/compatibilityDesktop.sh'
          }
        }

      }
    }

    stage('Deployment') {
      steps {
        echo 'All the tests were succesfull'
        sh './scripts/deployment/deployment.sh'
      }
    }

  }
}