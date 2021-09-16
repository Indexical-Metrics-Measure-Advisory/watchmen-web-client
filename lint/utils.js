const path = require('path')
const fs = require('fs')

const getAllFiles = (directory) => {
	const files = fs.readdirSync(directory)

	const allFiles = []

	files.forEach((file) => {
		if (fs.statSync(path.join(directory, file)).isDirectory()) {
			allFiles.push(...getAllFiles(path.join(directory, file)))
		} else {
			allFiles.push(path.join(directory, file))
		}
	})

	return allFiles
}

module.exports = {getAllFiles}