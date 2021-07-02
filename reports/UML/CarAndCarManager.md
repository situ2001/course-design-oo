@startuml

skinparam dpi 300

class Car { + number : string + model : string + enterTime : number + quitTime : number | undefined + price : number + cost : number | undefined + constructor(number : string, model : string) + leave() : void
}

class CarManager { - id : string - key : string + constructor(id : string, keyMD5 : string) + login(id : string, keyPlain : string) : boolean
}

@enduml
