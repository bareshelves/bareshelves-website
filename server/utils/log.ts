import chalk from 'chalk'

const tag = (text: string) => chalk.whiteBright(text)

export const httpLogTag = tag(chalk.bgMagentaBright(` HTTP `))
export const wsLogTag = tag(chalk.bgGreen(` WebSockets `))
export const cryptoLogTag = tag(chalk.bgCyan(` Cryptocurrency `))
