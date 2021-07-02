# Guangzhou University OO Course Design

广州大学面向对象程序设计课程设计

![](https://shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=flat-square)
![](https://shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=white&style=flat-square)

---

Developed in three days...Really in a hurry.

Main technology stack: JavaScript, TypeScript, Electron, React, Antd.

Thanks to template [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)!

## How to use

Clone this repo.

```powershell
git clone https://github.com/situ2001/course-design-oo.git
```

Enter then install deps.

```powershell
cd course-design-oo
yarn
```

Enjoy it.

```powershell
yarn start
```

Or build a package.

```powershell
yarn package
```

## Assignment

编写停车场管理程序，用于停车场对车辆的管理。程序能够实现可用车位统计与查询、零车位提示、停车时长统计、按车型时长收费、管理员收费累计等功能。

**设计要求及提示如下：**

编写停车场收费管理系统，定义汽车类`Car`和管理员类`CarManager`。

`Car`类有`number`(车牌号),`model`(车型)、`enterTime`(入场时间)、 `quitTime`(出场时间)、`price`(每小时收费价)、cost(费用)等属性。

`CarManager`类有`id`和`key`等。

实现以下收费功能：

1. 可用车位统计与查询
2. 零车位提示
3. 停车时长统计
4. 按车型时长收费
5. 管理员收费累计

## More

For more details, please check this: [程序设计课程设计报告](./reports/程序设计课程设计报告.md)

## Self Reflection

Leave blank due to exam week.

(Will be added in a half of month)
