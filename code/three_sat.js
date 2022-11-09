/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía", "Pablo Pérez González", "Aram Pérez Dios
 * @since Nov 3 2022
 * @desc 3SAT class
 * @module ThreeSAT
 */

 'use strict';

 export class ThreeSAT {
     
 
    constructor() {
        this.Literals = [];
        this.Clauses = [];
        this.NumberOfLiterals = 0;
        this.K = 0;
    }


    clear() {
        Literals = [];
        Clauses = [];
        numberOfLiterals = 0;
    }

    toString() {
        let output = "U = {";

        for (let literal of this.Literals) {
            output += literal + ", ";
        }

        output += this.Literals[this.NumberOfLiterals - 1] + "} ";
        output += "C = {";

        for (let clause of this.Clauses) 
            output += clause + ",";

        //output = output.substring(0, output.length() - 1);
        output += "} k = " + k;

        return output;
    }
 }