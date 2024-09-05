import fs from "fs";

import path from "path";

const excludeDirs = ['node_modules', 'dist', '.git'];

function printDirectoryStructure(dir, depth = 0, prefix = '') {
    const files = fs.readdirSync(dir);
    files.forEach((file, index) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        const isLast = index === files.length - 1;
        const newPrefix = prefix + (isLast ? '└── ' : '├── ');

        if (!excludeDirs.includes(file)) {
            console.log(prefix + (isLast ? '└── ' : '├── ') + file);
            if (stats.isDirectory()) {
                printDirectoryStructure(filePath, depth + 1, prefix + (isLast ? '    ' : '│   '));
            }
        }
    });
}

printDirectoryStructure(process.cwd());
