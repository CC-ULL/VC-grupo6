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
import {FileLoader} from './file_loader.js';
import {VertexCover} from './vertex_cover.js';

const CANVAS = document.getElementById('mainCanvas');

function main() {
  //let args = process.argv.slice(2);
  const threeSAT = new ThreeSAT();
  const loader = new FileLoader(threeSAT, "./input/input1.json");
  loader.LoadFile();
  //console.log(threeSAT, '\n\n\n\n', threeSAT.clauses);
  const vc = new VertexCover(threeSAT);
  vc.BuildVertexCover();

  //vc.Show();

  let view = new View(CANVAS, vc);
  view.update();
}

main();
