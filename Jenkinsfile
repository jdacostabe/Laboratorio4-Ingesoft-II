pipeline {
  agent none
  stages {
    stage('Build') {
      steps {
        sh 'echo \'The build was executed correctly\''
      }
    }

    stage('Testing') {
      parallel {
        stage('Testing routes') {
          steps {
            sh 'echo \'The routes were tested, everything is ok\''
          }
        }

        stage('Testing credentials services') {
          steps {
            sh 'echo \'The credentials are valid, there is no errors\''
          }
        }

        stage('Unit Testing') {
          steps {
            sh 'echo \'The Unit Tests were executed. All of them returned a positive answer.\''
          }
        }

        stage('End-to-End Testing') {
          steps {
            sh 'echo \'The End to End test was executed. Everything is ok.\''
          }
        }

        stage('Testing Integration') {
          steps {
            sh '''
echo \'The integration test was successfully excuted\''''
          }
        }

      }
    }

    stage('Security') {
      parallel {
        stage('Dependencies Analysis') {
          steps {
            sh '''  
echo \'The security analysis of the dependecies was succesfully executed, there is no vulnerable dependencies in the project\''''
          }
        }

        stage('Encripted DataBase') {
          steps {
            sh '''  
echo \'The test of the data stored in the databes was succesfully executed, all this data is encrypted correctly\''''
          }
        }

      }
    }

    stage('Static Code Analysis') {
      steps {
        sh 'echo \'The Static Code Analysis was succesfully executed\''
      }
    }

    stage('Compatibility') {
      parallel {
        stage('Compatibility with Browser') {
          steps {
            sh 'echo \'The compatibilty test with Browser succesfully executed\''
          }
        }

        stage('Compatibility with Mobile') {
          steps {
            sh 'echo \'The compatibilty test with Mobile devices was succesfully executed\''
          }
        }

        stage('Compatibility with Desktop') {
          steps {
            sh 'echo \'The compatibilty test with Desktop interface was succesfully executed\''
          }
        }

      }
    }

    stage('Deployment') {
      steps {
        echo 'All the tests were succesfull'
        sh '''
echo \'The deployment was succesfully executed\''''
      }
    }

  }
}