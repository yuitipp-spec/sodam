import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname } from 'path'

const TARGET_DIRS = [
  'public/images/residential',
  'public/images/commercial',
]

const MAX_WIDTH = 1920
const QUALITY = 80

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...await getFiles(fullPath))
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath)
    }
  }
  return files
}

let totalBefore = 0
let totalAfter = 0

for (const dir of TARGET_DIRS) {
  const files = await getFiles(dir)
  console.log(`\n📁 ${dir} - ${files.length}개 파일`)

  for (const file of files) {
    const before = (await stat(file)).size
    totalBefore += before

    try {
      const { readFile, writeFile } = await import('fs/promises')
      const inputBuffer = await readFile(file)
      const outputBuffer = await sharp(inputBuffer)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: QUALITY, mozjpeg: true })
        .toBuffer()

      const after = outputBuffer.length
      totalAfter += after

      const saved = Math.round((1 - after / before) * 100)
      if (saved > 0) {
        await writeFile(file, outputBuffer)
        console.log(`  ✓ ${file.split(/[\\/]/).pop()} ${(before/1024).toFixed(0)}KB → ${(after/1024).toFixed(0)}KB (-${saved}%)`)
      } else {
        totalAfter -= after
        totalAfter += before
        console.log(`  - ${file.split(/[\\/]/).pop()} 이미 최적화됨`)
      }
    } catch (e) {
      totalAfter += before
      console.log(`  ✗ ${file.split(/[\\/]/).pop()} 오류: ${e.message}`)
    }
  }
}

console.log(`\n✅ 완료!`)
console.log(`   전체 용량: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB`)
console.log(`   절감: ${(totalBefore - totalAfter)/1024/1024 > 0 ? ((totalBefore - totalAfter)/1024/1024).toFixed(1) + 'MB' : '없음'}`)
