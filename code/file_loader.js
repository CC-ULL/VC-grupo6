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

const fs = require('fs');



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
   
        ReadAllFileContent();
        SetlLiterals();
        SetClauses();
        SetKValue();
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
        
        for (let i = 0; i < satObj.literalsCount; i++) {
            this.#threeSAT.Add(satObj.literals[i]);
        }
    }

    SetClauses() {
        for (let i = 0; i < this.#satObj.clousuresCount; i++) {
            let clause = new Clausure();
            let literals = this.#satObj.clausures.split(' ');
            for (let j = 0; j < literals.lenght; j++) {
                clause.AddLiteral(literals[j]);
            }
            this.#threeSAT.Clauses.Add(clause);
        }
    }

    SetKValue() {
        this.#threeSAT.k = this.#threeSAT.Literals.Count + 2 * this.#threeSAT.Clauses.Count;
    }
}