const path = require('path')
const fs = require('fs')
const {getAllFiles} = require('./utils')
require('colors')

const root = path.join(__dirname, '../src');
const files = getAllFiles(root)
let failure = files.filter(file => file.endsWith('.tsx') || file.endsWith('.ts'))
	.map(file => file.replace(root, ''))
	.map(file => ({...path.parse(file), file}))
	.filter(p => p.dir !== '/')
	.map(p => ({...p, first: p.dir.match(/^\/([^\/]+).*/)[1]}))
	.filter(p => {
		return fs.readFileSync(path.join(root, p.file), 'UTF-8').split(/\r?\n/)
			.filter(line => line.includes('\'@/'))
			.some(line => line.includes(`\'@/${p.first}/`))
	}).sort((p1, p2) => {
		return p1.file.toUpperCase().localeCompare(p2.file.toUpperCase())
	}).map((p, index) => {
		console.log(`${index + 1}.\t` + p.file.red)
	}).length !== 0

if (failure) {
	console.log('Do import lint validating successfully, please fix the above issues.'.bold.underline.red)
} else {
	console.log('Do import lint validating successfully, no failure found.'.bold.underline.green)
}