/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Main
 */

'use strict';

//import {ThreeSAT} from './three_sat.js';
//import {Graph} from './graph.js';
const graphClass = require('graph');
//import {FileLoader} from './file_loader.js';
//import {VertexCover} from 'vertex_cover.js';

function main() {
  //let args = process.argv.slice(2);
  //const threeSAT = new ThreeSAT();
  //const loader = new FileLoader(threeSAT, args[0]);
  //loader.LoadFile();
  //console.log(threeSAT, '\n\n\n\n', threeSAT.clauses);
  //const vc = new VertexCover(threeSAT);
  //vc.BuildVertexCover();

  //vc.Show();

  // Using the above implemented graph class
  let g = new Graph(6);
  var vertices = [ 'A', 'B', 'C', 'D', 'E', 'F' ];
  
  // adding vertices
  for (let i = 0; i < vertices.length; i++) {
      g.addVertex(vertices[i]);
  }
  
  // adding edges
  g.addEdge('A', 'B');
  g.addEdge('A', 'D');
  g.addEdge('A', 'E');
  g.addEdge('B', 'C');
  g.addEdge('D', 'E');
  g.addEdge('E', 'F');
  g.addEdge('E', 'C');
  g.addEdge('C', 'F');
  
  // prints all vertex and
  // its adjacency list
  // A -> B D E
  // B -> A C
  // C -> B E F
  // D -> A E
  // E -> A D F C
  // F -> E C
  g.printGraph();
}

main();
