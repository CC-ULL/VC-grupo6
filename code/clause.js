/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Clase Clause
 * @module clause
 */

'use strict';


export class Clause {

  constructor(literals = []) {
    this.literals = literals;
  }

  addLiteral(literal) {
    literals.push(literal);
  }

  addLiteralAt(index, literal) {
    literals.insert(index, literal);
  }

  toString() {
    output = '{';

    for (const literal of this.literals) {
      output += literal + ', ';
    }
    output += '}';

    return (output);
  }
}