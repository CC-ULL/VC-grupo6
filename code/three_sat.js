/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 3 2022
 * @desc 3SAT class
 * @module ThreeSAT
 */

'use strict';

import {Clause} from './clause.js';

/** @desc Clase ThreeSAT */
export class ThreeSAT {
     
  /** @desc Constructor de la clase */
  constructor() {
    this.literals = [];
    this.clauses = [];
  }

  /**
   * @desc Método para crear una entrada de problema 3SAT desde un objeto
   * @param {Object} threeSATData - objeto 3SAT leido desde documento JSON
   */
  createFromObject(threeSATData) {
    let threesatObject = threeSATData;

    this.numberOfLiterals = threesatObject.literalsCount;           
    this.literals = threesatObject.literals;

    for (let i = 0; i < threesatObject.clausesCount; i++) {
      let literals = threesatObject.clauses[i].split(' ');
      let clause = new Clause(literals);
      this.clauses.push(clause);
    }
  }

  /** @desc Método para eliminar toda la información almacenada */
  clear() {
    this.literals = [];
    this.clauses = [];
    this.numberOfLiterals = 0;
  }

  /** 
   *  @desc Método para obtener la información almacenada en forma de  
   *      cadena de caracteres formateada
   *  @return {String} cadena formateada
   */
  toString() {
    let output = "U = {";

    for (const literal of this.literals) {
        output += literal + ", ";
    }

    output += this.literals[this.literals.length - 1] + "} ";
    output += "C = {";

    for (const clause of this.clauses) {
      output += clause + ",";
    }     

    //output = output.substring(0, output.length() - 1);
    output += "} k = " + k;
    return (output);
  }
}