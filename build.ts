import fs from 'fs-extra';
import childProcess from 'child_process';
import { log, error, info, warn } from 'console';

(async () => {
    try {
        // Remove current build
        await remove('./dist/');
        // Copy back-end files
        await exec('tsc --build tsconfig.prod.json', './')
        log("Build Success.")
        
    } catch (err) {
        error(err);
    }
})();


function remove(loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return fs.remove(loc, (err) => {
            return (!!err ? rej(err) : res());
        });
    });
}

function exec(cmd: string, loc: string): Promise<void> {
    return new Promise((res, rej) => {
        return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
            if (!!stdout) {
                info(stdout);
            }
            if (!!stderr) {
                warn(stderr);
            }
            return (!!err ? rej(err) : res());
        });
    });
}
