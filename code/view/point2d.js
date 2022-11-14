/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Jun 25 2022
 * @desc Clase Point2D
 * @module point-2d
 */

 'use strict';
 
 /** @desc Clase Point2D */
  export class Point2D {
   #coordinateX;
   #coordinateY;
   /**
    * @desc Constructor de la clase Point2D.
    * @param {Number} coordinateX - coordenada x del punto
    * @param {Number} coordinateY - coordenada y del punto
    */
  constructor(coordinateX, coordinateY) {
    this.#coordinateX = coordinateX;
    this.#coordinateY = coordinateY;
  }
 
   /**
    * @desc Método para obtener una cadena con la información del punto
    * @return {String} cadena en formato: {coordenadaX, coordenadaY}
    */
   toString() {
     return(`x:${this.#coordinateX}, y:${this.#coordinateY}, color:${this.color}`);
   }

   /**
   * @desc Método para cambiar la coordenada X del punto.
   * @param {Number} newCoordinateX - nueva coordenada X
   */
  setCoordinateX(newCoordinateX) {
    this.#coordinateX = newCoordinateX;
  }

  /**
   * @desc Método para cambiar la coordenada Y del punto.
   * @param {Number} newCoordinateY - nueva coordenada Y
   */
  setCoordinateY(newCoordinateY) {
    this.#coordinateY = newCoordinateY;
  }
 
   /**
    * @desc Método para obtener la coordenada x del punto
    * @return {Number} coordenada x
    */
   get coordinateX() {
     return(this.#coordinateX);
   }
 
   /**
    * @desc Método para obtener la coordenada y del punto
    * @return {Number} coordenada y
    */
   get coordinateY() {
     return(this.#coordinateY);
   }
 }