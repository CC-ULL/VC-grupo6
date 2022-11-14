/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Complejidad Computacional
 *
 * @author Roberto Carrazana Pernía, Pablo Pérez González, Aram Pérez Dios
 * @since Nov 11 2022
 * @desc Clase View
 * @module view
 */

'use static';

import { VertexCover } from '../vertex_cover.js';
import { Point2D } from './point2d.js';

import { SOLUTION } from '../main.js';
const POINT_SIZE = 30;

 /** @desc Clase View */
export class View {
  #context;
  #canvas;
  #height;
  #width;

  #vertexCover;

  /**
   * @desc Constructor de la clase View
   * @param {Element} canvas - canvas sobre el que dibujar
   * @param {VertexCover} vertexCover - problema VC
   */
  constructor(canvas, vertexCover) {
    this.#canvas = canvas;
    this.#context = canvas.getContext('2d');
    this.#height = Number(canvas.getAttribute('height'));
    this.#width = Number(canvas.getAttribute('width'));

    this.#vertexCover = vertexCover;
    this.allNodes = [];
    this.literalNodes = [];
    this.clauseNodes = [];    
    this.edges = [];

    this.allTags = [];
    this.literalTags = vertexCover.literalTags;
    this.clauseLiteralsTags = vertexCover.clauseLiteralTags;   
    
    this.#createGraphNodes();
    this.#createGraphEdges();    
  }

  /** @desc Método para crear los nodos del grafo */
  #createGraphNodes() {
    // Literales. Nodos de la parte superior.
    let width = this.#width * 0.90;
    let widthBetweenNodes = width / (this.literalTags.length - 1);
    let height = this.#height * 0.2;        
    
    let coordinateX = (width * 0.05);

    for (let node = 0; node < this.literalTags.length; ++node) {      
      this.literalNodes.push(new Point2D(coordinateX, height)); 
      coordinateX += widthBetweenNodes;     
    }
    // Cláusulas. Nodos de la parte inferior.
    let down = false;
    widthBetweenNodes = width / (this.clauseLiteralsTags.length - 1) ;
    height = this.#height * 0.7;

    coordinateX = (this.#width * 0.05);
    for (const clause of this.#vertexCover.threeSAT.clauses) {  
      down = !down;    
      for (const literal of clause.literals) {
        this.clauseNodes.push(new Point2D(coordinateX, height + (down * height / 5)));
        coordinateX += widthBetweenNodes;
        down = !down;
      }
    }
    this.allNodes = this.literalNodes.concat(this.clauseNodes);
    this.allTags = this.literalTags.concat(this.clauseLiteralsTags);
  }

  /** @desc Método para dibujar todos los nodos del grafo */
  #drawGraphNodes() { 
    this.#context.lineWidth = 1;   
    this.#drawLiteralNodes();
    this.#drawClauseNodes();
  }

  /** @desc Método para dibujar los nodos del grafo referentes a los literales*/
  #drawLiteralNodes() {
    for (let index = 0; index < this.literalTags.length; ++index) {
      this.#context.beginPath();
      this.#context.fillStyle = this.#isOnSolution(this.literalTags[index]) ? 'red' : 'yellow';
      this.#context.ellipse(this.literalNodes[index].coordinateX, this.literalNodes[index].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
      this.#context.fill();
      this.#context.stroke();

      this.#context.beginPath();
      this.#context.fillStyle = 'black';
      this.#context.font = '35px Arial';   
      this.#context.textAlign = "center";
      this.#context.textBaseline = "middle";
      this.#context.fillText(this.literalTags[index], this.literalNodes[index].coordinateX, this.literalNodes[index].coordinateY);
      this.#context.fill();
    }
  }

  /** @desc Método para dibujar los nodos del grafo componente de las cláusulas*/
  #drawClauseNodes() {
    for (let index = 0; index < this.clauseLiteralsTags.length; ++index) {
      this.#context.beginPath();
      this.#context.fillStyle = this.#isOnSolution(this.clauseLiteralsTags[index]) ? 'red' : 'orange';
      this.#context.ellipse(this.clauseNodes[index].coordinateX, this.clauseNodes[index].coordinateY, POINT_SIZE, POINT_SIZE, Math.PI / 4, 0, Math.PI * 2);
      this.#context.fill();
      this.#context.stroke();

      this.#context.beginPath();
      this.#context.fillStyle = 'black';
      this.#context.font = '25px Arial';   
      this.#context.textAlign = "center";
      this.#context.textBaseline = "middle";      
      this.#context.fillText(this.clauseLiteralsTags[index], this.clauseNodes[index].coordinateX, this.clauseNodes[index].coordinateY);
      this.#context.fill();
    }
  }

  /**
   * @desc Método para comprobar que el vértice proporcionado está dentro de la solución.
   * @param {String} nodeName - identificador del vértice
   * @return {true | false} - 'true' si está incluido en la solución
   */
  #isOnSolution(nodeName) {
    for (let index = 0; index < SOLUTION.length; ++index) {
      if (nodeName === SOLUTION[index]){
        return(true);
      }
    }
    return(false);
  }
  
  /** @desc Método para crear las aristas del grafo */
  #createGraphEdges() {
    let adjacentList = this.#vertexCover.graph.adjacentList;
    let vertexIndex = 0;
    for (const vertex of adjacentList) {
      for (const adjacentNode of adjacentList.get(vertex[0])) {
        for (let index = 0; index < this.allTags.length; ++index) {
          if (adjacentNode === this.allTags[index]) {
            //if (this.allNodes[vertexIndex] !== undefined)
            this.edges.push([this.allNodes[vertexIndex], this.allNodes[index]])
          }
        }
      }
      vertexIndex ++;
    }
  }

  /** @desc Método para dibujar las aristas del grafo */
  #drawGraphEdges() {    
    this.#context.lineWidth = 2;
    for (const edge of this.edges) {
      this.#context.beginPath();
      this.#context.strokeStyle = 'black';
      this.#context.moveTo(edge[0].coordinateX, edge[0].coordinateY);
      this.#context.lineTo(edge[1].coordinateX, edge[1].coordinateY);
      this.#context.stroke();
    }  
  }  

  /** @desc Método para animar redibujar la escena */
  update() {
    //this.#resizeCanvas();
    this.#resizeCanvasElements();
    this.#draw();
    
    window.requestAnimationFrame(() => this.update());
  }  

  /** @desc Método para dibujar la escena / mesa de poker */
  #draw() {  
    //this.#context.clearRect(0, 0, this.#width, this.#height);
    //this.#context.drawImage(this.#backgroundImage, 0, 0, this.#width, this.#height);
    this.#context.beginPath();
    this.#context.fillStyle = 'white';    
    this.#context.fillRect(0, 0, this.#width, this.#height);
    this.#context.fill();

    this.#drawGraphEdges();
    this.#drawGraphNodes();    
  }  
   
  /** @desc Método para ajustar el tamaño del canvas al tamaño de la ventana */
  #resizeCanvas() {
    this.#width = window.innerWidth * 0.96;
    this.#height = window.innerHeight * 0.85;
    this.#canvas.setAttribute('height', this.#height);
    this.#canvas.setAttribute('width', this.#width);
  }

   /** @desc Método para ajustar el tamaño de los elementos dentro del canvas */
  #resizeCanvasElements() {
  }

  /**
   * @desc Método getter para obtener la altura del canvas
   * @return {Number} altura del canvas
   */
  get height() {
    return(this.#height)
  }

  /**
   * @desc Método getter para obtener la anchura del canvas
   * @return {Number} anchura del canvas
   */
   get width() {
    return(this.#width)
  }
}
