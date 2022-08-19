import { runBuild } from './build'
import { runDevelop } from './develop'

const [ argv_type ] = process.argv.slice(2)

if (argv_type === 'build') {
  runBuild()
}
else if (['dev', 'develop', 'start'].includes(argv_type)) {
  runDevelop()
}