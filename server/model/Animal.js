class Animal {
  static #all = [];

  constructor(name, type, legs, color, hasFur) {
    this.name = name;
    this.type = type;
    this.legs = legs;
    this.color = color;
    this.hasFur = hasFur;

    Animal.#all.push(this);
  }

  static list() {
    return [...Animal.#all];
  }
}

new Animal('daffy', 'duck', 2, 'yellow', false);
new Animal('chickfila', 'cow', 4, 'white and black', false);
new Animal('cat', 'dog', 4, 'orange', true);

module.exports = Animal;