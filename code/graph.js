/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Vertex Cover class
 * @module VertexCover
 */

 'use strict';

// create a graph class
class Graph {
	// defining vertex array and
	// adjacent list
	constructor(numberOfVertices){
		this.noOfVertices = numberOfVertices;
		this.adjacentList = new Map();
	}

	// add vertex to the graph
  addVertex(newVertex){
    // initialize the adjacent list with a
    // null array
    this.adjacentList.set(newVertex, []);
  }

	// add edge to the graph
  addEdge(vertex, newVertex){
    this.adjacentList.get(vertex).push(newVertex);
    this.adjacentList.get(newVertex).push(vertex);
  }

	// Prints the vertex and adjacency list
  printGraph(){
    // get all the vertices
    let vertices = this.adjacentList.keys();

    // iterate over the vertices
    for (const vertex of vertices){
      // great the corresponding adjacency list
      // for the vertex
      let adjacentVertices = this.adjacentList.get(vertex);
      let output = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (const value of adjacentVertices)
        output += value + " ";

      // print the vertex and its adjacency list
      console.log(vertex + " -> " + output);
    }
  }


	// bfs(v)
	// dfs(v)
}
