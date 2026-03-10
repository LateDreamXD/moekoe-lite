import { execSync } from 'child_process';
import { resolve } from 'path';
import { cpSync, existsSync } from 'fs';

const apiPath = resolve(process.cwd(), 'core/api');

const os = (() => {
	switch (process.platform) {
		case 'win32':
			return 'win';
		case 'linux':
			if (process.arch === 'arm64')
				return 'linux-arm64';
			return 'linux';
		case 'darwin':
			return 'macos';
		default:
			throw new Error(`unsupported platform: '${process.platform}'`);
	}
})();

const ext = process.platform === 'win32' ? '.exe' : '';
const binPath = resolve(apiPath, `bin/app_${os}${ext}`);
const rustInfo = execSync('rustc -vV').toString();
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
	console.error('Failed to determine platform target triple');
	process.exit(1);
}

if (existsSync(binPath)) {
	console.log('found last built binary, skip building');
	cpSync(
		binPath,
		`./src-tauri/bin/api-${targetTriple}${ext}`
	);
} else {
	console.log(`building api server for ${os}...`);
	const timer = Date.now();

	execSync(`npm run pkg${os}`, { cwd: apiPath });
	cpSync(
		binPath,
		`./src-tauri/bin/api-${targetTriple}${ext}`
	);

	console.log(`api server build completed in ${Date.now() - timer}ms`);
}
