import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import createLogger from "progress-estimator";
// import log from "./log";
import chalk from "chalk";
const logger = createLogger({
  spinner:{
    interval: 10,
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'].map((frame) => chalk.blueBright(frame)),
  }
});

const gitOptions: Partial<SimpleGitOptions> ={
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
}
export const clone = async (selectedTemplate: any) => {
  const git: SimpleGit = simpleGit(gitOptions)
  try{
  await logger(git.clone(selectedTemplate.url, selectedTemplate.name,['-b', selectedTemplate.branch]),'Cloning template...',{
    estimate: 5000
  })
  }catch(err){
    console.log(err)
  }

  // 下面就是一些相关的提示
  console.log()
  console.log(chalk.blueBright(`==================================`))
  console.log(chalk.blueBright(`=== 欢迎使用 cjb-cli 脚手架 ===`))
  console.log(chalk.blueBright(`==================================`))
  console.log()

  console.log(`项目创建成功 ${chalk.blueBright(selectedTemplate.name)}`)
  console.log('执行以下命令启动项目：')
  console.log(`cd ${chalk.blueBright(selectedTemplate.name)}`)
  console.log(`${chalk.yellow('pnpm')} install`)
  console.log(`${chalk.yellow('pnpm')} run dev`)

}