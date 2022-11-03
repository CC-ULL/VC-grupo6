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

import {ThreeSAT} from 'three_sat.js';
import {FileLoader} from 'file_loader.js';
import {VertexCover} from 'vertex_cover.js';

export function main() {
  if (args.Length != 1) {
      Console.WriteLine("Usage: VC.exe file.sat3");
      return;
  }

  const threeSAT = new ThreeSAT();
  const loader = new FileLoader(threeSAT, args[0]);
  loader.LoadFile();
  const vc = new VertexCover(threeSAT);
  vc.BuildVertexCover();

  vc.Show();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}