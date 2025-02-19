import {select,input} from '@inquirer/prompts'
import {clone} from "@/utils/clone"

import * as path from 'path'
import * as fs from 'fs'
interface templateOptions {
  name: string // 模板名称
  url: string // 模板地址
  description: string // 模板描述
  branch: string // 分支
}

const templates: Map<string,templateOptions> =new Map(
  [
    ['管理系统模板-dev11',{
      name: 'admin-template-11',
      url: 'https://gitee.com/sohucw/admin-pro.git',
      description: '管理系统模板11的描述',
      branch: 'dev11'
    }],
    ['管理系统模板-dev6',{
      name: 'admin-template-6',
      url: 'https://gitee.com/sohucw/admin-pro.git',
      description: '管理系统模板6的描述',
      branch: 'dev6'
    }]

]) 

export const create= async (name?: string) => {
  const inputName=name || await input({
    message: '请输入项目名称',
    // validate: (value: string) => {
    //   if (!value){
    //     console.log('\n项目名称不能为空')
    //     return false
    //   }
    //   return true
    // }
  })

const isOverwrite=async (name: string) => {
  return await select({
    message: `项目${name}已存在，是否覆盖？`,
    choices: [
      {name: '覆盖', value: true},
      {name: '取消', value: false}
    ]
  })
}
  const filePath=path.resolve(process.cwd(),inputName)
  if (fs.existsSync(filePath)){
    const run= await isOverwrite(inputName)
    if(run){
      fs.rm(filePath, { recursive: true }, () => { })
    }else{
      return
    }
  }



  const selectedTemplate=await select({
    message: '请选择模板',
    choices: [
      ...Array.from(templates.keys()).map(key => ({
        name: `${key} - ${templates.get(key)?.description}`,
        value: {
          name: inputName,
          url: templates.get(key)?.url as string,
          branch: templates.get(key)?.branch as string
        }
      }))
    ]
  })
  // console.log(selectedTemplate)

  clone(selectedTemplate)
  
}