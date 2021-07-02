@startuml

skinparam dpi 300

class App {}
class Head {}
class Home {}
class StatExtra {}
class ManagerSwitch {}
class ParkingSpot {}
class Login {}
class Manager {}
class MyTable {}
class MyChart {}
class React.Component {}

React.Component <|-- App
React.Component <|-- Head
React.Component <|-- Home
React.Component <|-- StatExtra
React.Component <|-- ManagerSwitch
React.Component <|-- ParkingSpot
React.Component <|-- Login
React.Component <|-- Manager
React.Component <|-- MyTable
React.Component <|-- MyChart

App _-- Head
Head _-- Home
Head _-- StatExtra
Head _-- ManagerSwitch
Home _-- ParkingSpot
ManagerSwitch _-- Login
ManagerSwitch _-- Manager
Manager _-- MyTable
Manager \*-- MyChart

@enduml
