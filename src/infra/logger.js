import logplease, { Colors } from 'logplease'

const DEFAULT_LOG_LEVEL = 'INFO'
const logLevel = process.env.LOG_LEVEL || DEFAULT_LOG_LEVEL

logplease.setLogLevel(logLevel)

const options = {
  useColors: true,
  color: Colors.Blue,
  showTimestamp: true,
  useLocalTime: false,
  showLevel: true,
  filename: null,
  appendFile: true
}

export default function (loggerName) {
  return logplease.create(loggerName, options)
}
