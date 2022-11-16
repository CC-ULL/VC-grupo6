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
   * @param {ThreeSAT} threeSAT - entrada de un problema ThreeSAT
   */
  constructor(threeSAT) {
    this.threeSAT = threeSAT;
    this.graph = new Graph();
    this.literalTags = [];
    this.clauseLiteralTags = [];
    this.#createLiterals();
    this.#createClauses();
  }
 
  /** @desc Método para crear los literales incluidos en el VertexCover */
  #createLiterals() {
    for (const literal of this.threeSAT.literals) {
      this.graph.addVertex(literal);
      this.graph.addVertex('!' + literal);
      this.graph.addEdge(literal, '!' + literal);

      this.literalTags.push(literal);
      this.literalTags.push('!' + literal);
    }    
  }

   /** @desc Método para crear las cláusulas */
  #createClauses() {
    let clauseNumber = 0;
    for (const clause of this.threeSAT.clauses) {
      this.graph.addVertex(`a${clauseNumber}[1]`);
      this.graph.addVertex(`a${clauseNumber}[2]`);
      this.graph.addVertex(`a${clauseNumber}[3]`);

      this.graph.addEdge(`a${clauseNumber}[1]`, `a${clauseNumber}[2]`);
      this.graph.addEdge(`a${clauseNumber}[1]`, `a${clauseNumber}[3]`);
      this.graph.addEdge(`a${clauseNumber}[2]`, `a${clauseNumber}[3]`);

      // Cada a[i][j] se conecta al literal correspondiente de la clausula
      this.graph.addEdge(`a${clauseNumber}[1]`, clause.literals[0]);
      this.graph.addEdge(`a${clauseNumber}[2]`, clause.literals[1]);
      this.graph.addEdge(`a${clauseNumber}[3]`, clause.literals[2]);

      this.clauseLiteralTags.push(`a${clauseNumber}[1]`);
      this.clauseLiteralTags.push(`a${clauseNumber}[2]`);
      this.clauseLiteralTags.push(`a${clauseNumber}[3]`);

      clauseNumber++;
    }
  }
}