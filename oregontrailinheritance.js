let Quarantine = false;

class Traveler {
    constructor(name, food = 1, _isHealthy = true) { //constructor(name, food)
        this.name = name;
        this.food = food
        this._isHealthy = _isHealthy
    }

   hunt() {
       return this.food += 2
   }

   eat() {
    if (this.food > 0){
        this.food -= 1
        this._isHealthy = true
        Quarantine = false;
        return ('Comeu e está bem.')
    } else if (this.food < 1) {
        this._isHealthy = false
        return 'Não está saudavel'
    }
   }
}

class Hunter extends Traveler {
    constructor(name){
        super(name)
        this.food = 2
    }
    
    hunt(){
        this.food += 5
    }

    eat() {
        if (this.food > 1){
            this.food -= 2
            this._isHealthy = true
            Quarantine = false;
            return ('Comeu e está bem.')
        } else if (this.food < 1) {
            this._isHealthy = false
            return 'Não está saudavel'
        } else if (this.food < 2){
            this.food -= 1
            this._isHealthy = false
            return 'Não está saudavel'
        }
    }
    
    giveFood(traveler, numOfFoodUnits){
        if(numOfFoodUnits < this.food){
            this.food -= numOfFoodUnits
            traveler.food += numOfFoodUnits
        } else {
           return "Food insuficiente."
        }
    }
}

class Doctor extends Traveler {
    constructor(name) { //constructor(name, food)
        super(name)
    }

   hunt() {
       return this.food += 2
   }

    eat() {
        if (this.food > 0){
            this.food -= 1
            this._isHealthy = true
            Quarantine = false;
            return ('Comeu e está bem.')
        } else if (this.food < 1) {
            this._isHealthy = false
            return 'Não está saudavel'
        }
    }
    
    heal(traveler) {
        traveler._isHealthy = true
        Quarantine = false
    }
}


class Wagon extends Traveler {
    constructor(capacity, name) {
        super(name)
        this.capacity = capacity;
        this.passageiros = []
    }

    getAvailableSeatCount() {      
        //Retorna o número de assentos vazios, determinado pela capacidade que foi estipulada quando a carroça foi criada comparado com o número de passageiros a bordo no momento.
        if (this.passageiros.length < this.capacity){
            return this.capacity - this.passageiros.length 
        } else if (this.passageiros.length >= this.capacity){
            return 0
        }
    }
    


    join(x) {
        //Adicione um viajante à carroça se tiver espaço. Se a carroça já estiver cheia, não o adicione.
        if (this.getAvailableSeatCount() > 0){
            this.passageiros.push (x)
        } else {
            return 'Está cheio'
        }
    }

    
    shouldQuarantine(){
        
        for (let i = 0; i < this.passageiros.length; i++) {
            if (this.passageiros[i]._isHealthy === true){
                Quarantine = false
            } else {
                Quarantine = true
                break;
                }
        }
        return Quarantine
    }

    

    totalFood() {
        let foodTotal = 0;
        for (let i = 0; i < this.passageiros.length; i++) {
            foodTotal += this.passageiros[i].food
        }
        return foodTotal
    }

    //Retorna o número total de comida de todos os ocupantes da carroça.

    
}

// Uma Wagon (Carroça) também tem algumas propriedades: - uma capacity (capacidade) (número), 
// que deve ser fornecida como parâmetro para o construtor, determina a quantidade máxima de passageiros que cabe na carroça. - 
// uma lista de passageiros (array) que inicialmente está vazia.

let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
 
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
 
wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
 
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
 
sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();
 
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
 
henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)
 
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
 
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
 
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
 
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);