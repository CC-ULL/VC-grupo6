/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 3 2022
 * @desc Main
 */

'use strict';

import {ThreeSAT} from './three_sat.js';
import {VertexCover} from './vertex_cover.js';

import threeSATData from "./input/input4.json" assert { type: 'json' };

import { View } from './view/view.js';
const CANVAS = document.getElementById('mainCanvas');

/** @desc Función main */
function main() {
  //let args = process.argv.slice(2);  
  //const loader = new FileLoader(threeSAT, "./input/input1.json");
  //loader.LoadFile();
  //console.log(threeSAT, '\n\n\n\n', threeSAT.clauses);

  const threeSAT = new ThreeSAT();
  threeSAT.createFromObject(threeSATData);  

  const vc = new VertexCover(threeSAT);
  vc.buildVertexCover();
  
  console.log(threeSAT.literals, threeSAT.clauses);
  vc.graph.printGraph();  // <---- muestra el grafo correctamente en consola

  let view = new View(CANVAS, vc);
  view.update();
}

main();
