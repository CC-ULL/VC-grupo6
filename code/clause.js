/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Clase Clause
 * @module clause
 */

'use strict';

/** @desc Clase Clause */
export class Clause {

  /** @desc Constructor de la clase */
  constructor(literals = []) {
    this.literals = literals;
  }

  /**
   * @desc Método para añadir un nuevo literal a la cláusula
   * @param {String} literal - identificador del literal
   */
  addLiteral(literal) {
    literals.push(literal);
  }

  /**
   * @desc Método para insertar un literal a la cláusula en una posición especificada
   * @param {Number} index - índice/posición donde insertar
   * @param {String} literal - identificador del literal
   */
  addLiteralAt(index, literal) {
    literals.insert(index, literal);
  }

  /** 
   *  @desc Método para obtener la información almacenada en forma de  
   *      cadena de caracteres formateada
   *  @return {String} cadena formateada
   */
  toString() {
    output = '{';

    for (const literal of this.literals) {
      output += literal + ', ';
    }
    output += '}';

    return (output);
  }
}