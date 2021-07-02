@startuml

start

: 初始化 electron-store
以读取配置文件;
: 从./src/models/Car.ts
引入 Car 类;
: 读取配置文件;
: 新建空数组 parkingLog;

if(配置文件含有键 parkingLog) then(yes)
: 从 config.json 中读取 parkingLog 的值;
: 将这些值逐个添加至 parkingLog 中;
else (no)

endif

: export 出操作该数组的方法;

stop

@enduml
