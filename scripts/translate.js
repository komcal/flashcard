const fs = require('fs');
// const { words } = require('../words/oxford-3000-en')
const { words } = require('../words/oxford-5000-en')
const {Translate} = require('@google-cloud/translate').v2

const projectId = '' // add google projectId
const file = 'oxford-5000' // add file name

const translate = new Translate({
  projectId
})

async function main() {
  const listWords = [
    ...words
  ]
  const filePath = `./words/${file}.js`
  const target = 'th'
  const wordObjects = []
  for(const word of listWords) {
    const [translation] = await translate.translate(word, target);
    console.log(word, translation)
    wordObjects.push(JSON.stringify({ en: word, th: translation }))
  }
  const lines = [
    'const words = [',
    wordObjects.join(',\n'),
    ']',
    'module.exports = { words }'
  ]

  await fs.writeFileSync(filePath, lines.join('\n'))
  console.log('done!')
}

main()
