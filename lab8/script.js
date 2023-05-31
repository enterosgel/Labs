class Employee {
  #name;
  #surname;
  #baseSalary;
  #experience;

  constructor (name, surname, baseSalary, experience) {
    this.#name = name
    this.#surname = surname
    this.#baseSalary = baseSalary
    this.#experience = experience
  }

  get name () {
    return this.#name
  }  

  set name (value) {
    this.#name = value
  }

  get surname () {
    return this.#surname
  }  

  set surname (value) {
    this.#surname = value
  }

  get baseSalary () {
    return this.#baseSalary
  }  

  set baseSalary (value) {
    this.#baseSalary = value
  }

  get experience () {
    return this.#experience
  }  

  set experience (value) {
    this.#experience = value
  }

  countedSalary () {
    if (this.#experience > 5) {
      return this.#baseSalary * 1.2  + 500
    }

    if (this.#experience > 2) {
      return this.#baseSalary + 200
    }

    return this.#baseSalary
  }
}

class Designer extends Employee {
  #efficiencyRatio; //? number from 0 to 1
  constructor (name, surname, baseSalary, experience, efficiencyRatio) {
    super(name, surname, baseSalary, experience)
    this.#efficiencyRatio = efficiencyRatio
  }

  get efficiencyRatio () {
    return this.#efficiencyRatio
  }

  set efficiencyRatio (value) {
    this.#efficiencyRatio = value
  }

  countedSalary () {
    return super.countedSalary() * this.#efficiencyRatio
  }
}

class Manager extends Employee {
  #team = [];
  constructor (name, surname, baseSalary, experience) {
    super(name, surname, baseSalary, experience)
  }

  get team () {
    return this.#team
  }

  set team (value) {
    this.#team = value
  }

  addToTeam (employee) {
    this.#team.push(employee)
  }

  removeFromTeam(employee) {
    if (!employee) {
      return this.#team.pop()
    }

    const employeeIndex = this.#team.findIndex((item) => item.name === employee.name)
    return this.#team.splice(employeeIndex, 1)
  }

  countedSalary () {
    let salary = super.countedSalary()
    if (this.#team.length > 10) {
      salary += 300
    } else if (this.#team.length > 5) {
      salary += 200
    }

    const developersQuantity = this.#team.reduce((acc, employee) => {
      if (employee instanceof Developer) {
        return acc + 1
      }
      return acc
    }, 0)

    if (this.#team.length / 2 < developersQuantity) {
      salary = salary + salary * 0.1
    }
    return salary
  }
}

class Developer extends Employee {
  constructor (name, surname, baseSalary, experience) {
    super(name, surname, baseSalary, experience)
  }
}

class Department {
  #managers = [];

  constructor () {
    this.#managers = [];
  }

  get managers () {
    return this.#managers
  }

  set managers (value) {
    this.#managers = value
  }

  addToDepartment (manager) {
    this.#managers.push(manager)
  }

  removeFromDepartment(manager) {
    if (!manager) {
      return this.#managers.pop()
    }

    const managerIndex = this.#managers.findIndex((item) => item.name === manager.name)
    return this.#managers.splice(managerIndex, 1)
  }

  giveSalary () {
    this.#managers.forEach((manager) => {
      console.log(`${manager.name} ${manager.surname} отримав ${manager.countedSalary()} шекєлей`)
      manager.team.forEach((employee) => {
        console.log(`${employee.name} ${employee.surname} отримав ${employee.countedSalary()} шекєлей`)
      })
    })
  }
}

const developers = [
  new Developer("John", "Doe", 5000, 3),
  new Developer("Jane", "Smith", 6000, 7),
  new Developer("Mike", "Johnson", 4000, 1),
  new Developer("Emily", "Davis", 5500, 4),
  new Developer("Mark", "Wilson", 7000, 9),
  new Developer("Sarah", "Anderson", 6000, 2),
  new Developer("Alex", "Miller", 4500, 6),
  new Developer("Olivia", "Thomas", 5500, 5),
  new Developer("Daniel", "Harris", 5000, 2),
  new Developer("Sophia", "Moore", 6500, 8),
  new Developer("Jacob", "Walker", 5500, 4),
  new Developer("Ella", "Jackson", 6000, 6),
  new Developer("William", "Taylor", 4500, 3),
  new Developer("Avery", "Martin", 5500, 5),
  new Developer("Oliver", "Anderson", 6500, 7),
  new Developer("Mia", "Hill", 5000, 2)
];

const designers = [
  new Designer("David", "Clark", 8000, 6, 0.8),
  new Designer("Laura", "Taylor", 9000, 8, 0.9),
  new Designer("Michael", "Walker", 7500, 4, 0.75),
  new Designer("Emma", "White", 7000, 5, 0.85),
  new Designer("Andrew", "Jones", 6000, 3, 0.7),
  new Designer("Grace", "Allen", 6500, 7, 0.95),
  new Designer("Benjamin", "Young", 5500, 2, 0.6),
  new Designer("Ava", "Scott", 5000, 4, 0.8),
  new Designer("Henry", "Baker", 7000, 6, 0.75),
  new Designer("Lily", "Hill", 6000, 3, 0.9),
  new Designer("Jack", "Thompson", 5500, 5, 0.8),
  new Designer("Sophie", "Roberts", 6000, 7, 0.85),
  new Designer("Matthew", "Adams", 4500, 2, 0.65),
];

const managers = [
  new Manager("Jeff", "Bezos", 8000, 6),
  new Manager("Andrew", "Tate", 9000, 8),
  new Manager("Elon", "Musk", 7500, 4)
]

const department = new Department()

for (let i = 0; i < developers.length; i++) {
  if (i < 5) {
    managers[0].addToTeam(developers[i])
    continue
  }
  if (i < 10) {
    managers[1].addToTeam(developers[i])
    continue
  }
  if (i < developers.length) {
    managers[2].addToTeam(developers[i])
    continue
  }
}

for (let i = 0; i < designers.length; i++) {
  if (i < 5) {
    managers[0].addToTeam(designers[i])
    continue
  }
  if (i < 10) {
    managers[1].addToTeam(designers[i])
    continue
  }
  if (i < designers.length) {
    managers[2].addToTeam(designers[i])
    continue
  }
}

managers.forEach((manager) => {
  console.log(`Manager: ${manager.name} ${manager.surname}: `)
  manager.team.forEach((employee) => {
    const position = employee instanceof Developer ? 'Developer' : 'Designer'
    console.log(` ${position} ${employee.name} ${employee.surname}`)
  })
  console.log()
})

department.managers = managers
department.giveSalary()