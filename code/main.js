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

//import { Controller } from '../code/controller.js';
import { View } from './view/view.js';
//import { Model } from '../code/model.js';


import {ThreeSAT} from './three_sat.js';
import {VertexCover} from './vertex_cover.js';

const CANVAS = document.getElementById('mainCanvas');

import threeSATData from "./input/input1.json" assert { type: 'json' };

function main() {
  const threeSAT = new ThreeSAT();
  //let args = process.argv.slice(2);  
  //const loader = new FileLoader(threeSAT, "./input/input1.json");
  //loader.LoadFile();
  //console.log(threeSAT, '\n\n\n\n', threeSAT.clauses);

  let threesatObject = threeSATData;

  threeSAT.numberOfLiterals = threesatObject.literalsCount;           
  threeSAT.literals = threesatObject.literals;

  for (let i = 0; i < threesatObject.clausesCount; i++) {
    let literals = threesatObject.clauses[i].split(' ');
    let clause = new Clause(literals);
    threeSAT.clauses.push(clause);
  }

  const vc = new VertexCover(threeSAT);
  vc.buildVertexCover(); // <---- solucionado en tres lineas en vertex_cover en la funcion createClauses()
  
  console.log(threeSAT.literals, threeSAT.clauses);
  vc.graph.printGraph();  // <---- muestra el grafo correctamente en consola
  //vc.Show();

  let view = new View(CANVAS, vc);
  view.update();
}

main();
