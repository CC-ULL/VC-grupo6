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
    this.AdjList.set(newVertex, []);
  }

	// add edge to the graph
  addEdge(v, w){
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    this.AdjList.get(w).push(v);
  }

	// Prints the vertex and adjacency list
  printGraph(){
    // get all the vertices
    let get_keys = this.AdjList.keys();

    // iterate over the vertices
    for (const i of get_keys){
      // great the corresponding adjacency list
      // for the vertex
      let get_values = this.AdjList.get(i);
      let conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values)
        conc += j + " ";

      // print the vertex and its adjacency list
      console.log(i + " -> " + conc);
    }
  }


	// bfs(v)
	// dfs(v)
}
