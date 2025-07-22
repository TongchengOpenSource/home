const simpleGit = require('simple-git');
const os = require('os');
const fs = require('fs');
const git = simpleGit();
const conf = require('./config.json');
let cp = require('child_process');

if(!conf.githubConfig){
    console.error('未配置githubConfig,不执行sync github操作：https://tech.inf.17usoft.com/help/%E9%AB%98%E7%BA%A7%E7%89%B9%E6%80%A7/user-guide');
    return;
}

// 设置你的GitHub Access Token和仓库信息
const accessToken = conf.githubConfig.accessToken;
const repository = conf.githubConfig.repository;
const branchName = conf.githubConfig.branch;
const localRepoPath = './github-sync'; // 本地仓库路径

async function cloneOrPullRepo() {
    console.log('步骤一：克隆或拉取远程仓库')
    if (!fs.existsSync(localRepoPath)) {
        // 如果本地仓库不存在，则克隆新仓库
        console.log('本地仓库不存在，克隆新仓库')
        await git.clone(repository, localRepoPath, ['-b', branchName]);
    } else {
        // 如果本地仓库已存在，则拉取最新的代码
        console.log('本地仓库已存在，拉取最新的代码')
        await git.cwd(localRepoPath).pull((err, update) => {
            if(update && update.summary.changes) {
                console.log('更新了仓库!');
            }
        });
    }
    await autoBuild()
}

async function pushToGithub() {
    console.log('步骤四：推送到github')
    try {
        // 配置Git使用你的Access Token进行身份验证
        git.cwd(localRepoPath);
        console.log('conf.githubConfig');
        git.addConfig('user', conf.githubConfig.userName);
        git.addConfig('user.name', conf.githubConfig.userName);
        git.addConfig('user.email', conf.githubConfig.userEmail);
        // git.addConfig('http.https://github.com/.extraheader', `AUTHORIZATION: basic ${Buffer.from(`${conf.githubConfig.userName}:${accessToken}`).toString('base64')}`);
        console.log("git list config",git.listConfig())
        // 使用Access Token
        const encodedToken = Buffer.from(`${conf.githubConfig.userName}:${accessToken}`).toString('base64');
        const remoteUrl = repository.replace('https://', `https://${accessToken}@`);
        // git.addRemote('origin', repository)
        git.addConfig(`http.https://github.com/.extraheader`, `AUTHORIZATION: basic ${encodedToken}`);
        // git.addConfig(`http.${repository.split('.git')[0]}/.extraheader`, `AUTHORIZATION: basic ${encodedToken}`);
        // let child = cp.spawn(`git `, ['config --global push.default simple'], {stdio: 'inherit','shell':true});
        // child.on('close', async function (code) {
        //     console.log(code);
        // });
        // 添加文件、提交和推送到远程仓库
        await git.add('./*');
        await git.commit('build: robot auto-sync by '+ os.platform()+` ${new Date().toISOString()}`);
        await git.push(remoteUrl, branchName);

        console.log('代码成功推送到GitHub!');
    } catch (error) {
        console.error('推送到GitHub失败:', error);
    }
}
const autoBuild = async () => {
    try {
        console.log('步骤二：打包build：github')
        const cmdStr = ` build:github`;
        let child = cp.spawn(`npm run`, [cmdStr], {stdio: 'inherit','shell':true});
        child.on('data',(data)=>{
            console.log(data);
        })
        child.on('error', async function (code) {
            console.log('error'+code);
        })
        child.on('close', async function (code) {
            console.log('close'+code);
            await copyBuildFile()
        });
    } catch (err) {
        console.error('构建失败:', err);
    }
}

const copyBuildFile = async () => {
    // 复制build文件到github-sync目录下
    try {
        console.log('步骤三：复制build文件到github-sync目录下')
        let child = cp.spawn(`cp `, ['-rfv','./github-build/*',localRepoPath], {stdio: 'inherit','shell':true});
        child.on('data',(data)=>{
            console.log(data);
        })
        child.on('error', async function (code) {
            console.log('error'+code);
        })
        child.on('close', async function (code) {
            console.log(code);
            await pushToGithub();
        });
        // let child2 = cp.spawn(`rm`, [`-rf ${localRepoPath}`], {stdio: 'inherit','shell':true});
        // child2.on('close', async function (code) {
        //     console.log(code);
        // });
    } catch (err) {
        console.error('复制build文件失败:', err);
    }
}

cloneOrPullRepo();

