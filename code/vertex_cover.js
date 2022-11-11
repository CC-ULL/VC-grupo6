/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Vertex Cover class
 * @module VertexCover
 */

'use strict';

import { Graph } from './graph.js';

 /** @desc Clase VertexCover */
export class VertexCover {
  
  /**
   * @desc Constructor de la clase VertexCover
   * @param {ThreeSAT} threeSAT - salida de un problema ThreeSAT
   */
  constructor(threeSAT) {
    this.#threeSAT = threeSAT;
    this.graph = new Graph();
  }
 
  /** @desc Método para construir el VertexCover */
  buildVertexCover() {
    this.createLiterals();
    this.createClauses();
  }
 
  /** @desc Método para crear los literales incluidos en el VertexCover */
  createLiterals() {
    for (const literal of this.#threeSAT.literals) {
      this.graph.AddVertex(literal);
      this.graph.AddVertex('!' + literal);
      this.graph.AddEdge(literal, '!' + literal);
    }
  }

   /** @desc Método para crear las cláusulas */
  createClauses() {
    let clauseNumber = 0;
    for (const clause of this.#threeSAT.clauses) {
      this.graph.AddVertex(`a${clauseNumber}[1]`);
      this.graph.AddVertex(`a${clauseNumber}[2]`);
      this.graph.AddVertex(`a${clauseNumber}[3]`);

      this.graph.AddEdge(`a${clauseNumber}[1]`, `a${clauseNumber}[2]`);
      this.graph.AddEdge(`a${clauseNumber}[1]`, `a${clauseNumber}[3]`);
      this.graph.AddEdge(`a${clauseNumber}[2]`, `a${clauseNumber}[3]`);

      
      let actualClause = 0;
      for(let index = 0; index < clause.length; ++index) {
        if (clause[index] !== ' ') {
          if (clause[index] === '!') {
            this.graph.addEdge(`a${clauseNumber}[${actualClause}]`, clause.substring(index, index+2));
            ++ index;
          }
          else {
            this.graph.addEdge(`a${clauseNumber}[${actualClause}]`, clause.substring(index, index+1));
          }
          ++ index;
          ++ actualClause;
        }
      }

      ++ clauseNumber;
    }
  }
}