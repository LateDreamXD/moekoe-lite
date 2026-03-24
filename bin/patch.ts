import { resolve } from 'path';
import { readdirSync } from 'fs';
import { execSync } from 'child_process';

const corePath = resolve(process.cwd(), 'core');
const timer = Date.now();
console.log('appling patches...');

for (const path of readdirSync(resolve(process.cwd(), 'patches'))) {
	try {
		execSync(`git apply ${resolve(corePath, '..', 'patches', path)}`,
			{ cwd: corePath, maxBuffer: 1024 * 1024 * 10 });
		console.log(`patch ${path} applied`);
	} catch {
		console.warn(`patch ${path} failed to apply`);
	}
}
console.log(`patches applied in ${Date.now() - timer}ms`);

