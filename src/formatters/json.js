import flatten from '../flatten.js'

export default function json(ast) {
  return JSON.stringify(flatten(ast), null, 2)
}
