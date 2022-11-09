/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc File loader class
 * @module FileLoader
 */

'use strict';

import { Console } from 'console';
import fs from 'fs';
import {Clause} from './clause.js';
import {ThreeSAT} from './three_sat.js';

export class FileLoader {
    
    #threeSAT = {};
    #pathToFileName = '';
    #satObj = {};
  
    constructor(threeSAT, pathToFileName) {
        this.#threeSAT = threeSAT;
        this.#pathToFileName = pathToFileName;
        this.#satObj = {};
    }
         
    LoadFile() {
        if (this.#threeSAT.NumberOfLiterals > 0 || this.#threeSAT.Literals.Count > 0 || this.#threeSAT.Clauses.Count > 0) this.#threeSAT.Clear();
        
        this.ReadAllFileContent();
        this.SetlLiterals();
        this.SetClauses();
        this.SetKValue();
    }

    ReadAllFileContent() {
        try {
            let lines = fs.readFileSync(this.#pathToFileName, 'utf8');
            this.#satObj = JSON.parse(lines);
        } catch (err) {
            console.error(err);
        }
    }

    SetlLiterals() {
        this.#threeSAT.NumberOfLiterals = this.#satObj.literalsCount;           
        this.#threeSAT.Literals = this.#satObj.literals;
        //
        /*for (let i = 0; i < this.#satObj.literalsCount; i++) {
            this.#threeSAT.Literals.push(this.#satObj.literals[i]);
        }*/
    }

    SetClauses() {
        for (let i = 0; i < this.#satObj.clousuresCount; i++) {
            let literals = this.#satObj.clousures[i].split(' ');
            let clause = new Clause(literals);
            this.#threeSAT.Clauses.push(clause);
        }
    }

    SetKValue() {
        this.#threeSAT.K = this.#threeSAT.NumberOfLiterals + 2 * this.#satObj.clousuresCount;
    }
}