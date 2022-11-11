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

 /** @desc Clase Graph */
export class Graph {

	/**
   * @desc Constructor de la clase Graph
   * @param {Number} numberOfVertices - cantidad de nodos
   */
	constructor(numberOfVertices){
		this.numberOfVertices = numberOfVertices;
		this.adjacentList = new Map();
	}

	/**
   * @desc Método para añadir un nuevo nodo
   * @param {String} newVertex - etiqueta del nuevo vértice
   */
  addVertex(newVertex){
    this.adjacentList.set(newVertex, []);
  }

	/**
   * @desc Método para añadir una nueva arista
   * @param {String} vertex - etiqueta del vértice que se quiere conectar
   * @param {String} newVertex - etiqueta del vértice al que se conecta
   */
  addEdge(vertex, newVertex){
    this.adjacentList.get(vertex).push(newVertex);
    this.adjacentList.get(newVertex).push(vertex);
  }

	/** @desc Método para imprimir el grafo por consola */
  printGraph(){
    let vertices = this.adjacentList.keys();

    for (const vertex of vertices){
      let adjacentVertices = this.adjacentList.get(vertex);
      let output = "";

      for (const value of adjacentVertices)
        output += value + " ";

      console.log(vertex + " -> " + output);
    }
  }
}
